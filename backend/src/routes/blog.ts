import { Hono } from "hono";
import { Prisma, PrismaClient } from "../generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

export const blogRouter = new Hono<{
    Bindings:{
        JWT_SECRET : string;
        DATABASE_URL: string;
    }
}>();

//MIDDLE-WARE
blogRouter.use("/*", async (c,next) => {
    next()
})

//add blog
blogRouter.post("/", async (c)=>{
    const body =await c.req.json()

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.post.create({
        data:{
            title:body.title,
            content : body.content,
            authorId : "1"
        }
    })

    return c.json({
        id: blog.id
    })

})

blogRouter.put("/", async(c)=>{
    const body = await c.req.json()
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    
    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data:{
            title:body.title,
            content:body.content,
        }
    })

    return c.json({
        id: blog.id
    })    
})

blogRouter.get("/", async (c)=>{
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.post.findFirst({
            where : {
                id: body.id
            }
        })

        return c.json({
            blog
        })
        
    } catch (error) {
        c.status(411)
        return c.json({
            error : "couldnt get the blog " + error
        })
    }
})

//pagination -> first show first 10, then if user asks more, show more.

blogRouter.get("/bulk", async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blog = await prisma.post.findMany();

    return c.json({
        blog
    })
})
