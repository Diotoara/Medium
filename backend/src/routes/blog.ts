import { Hono } from "hono";
import { Prisma, PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@aryan-jha/medium-common";

export const blogRouter = new Hono<{
    Bindings:{
        JWT_SECRET : string;
        PRISMA_ACCELERATE_URL: string;
    },
    Variables:{
        userId : any,
    }
}>();

//MIDDLE-WARE
blogRouter.use("/*", async (c,next) => {
    const authHeader = c.req.header("Authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET)
        c.set("userId", user.id);
        await next()
        
    } catch (error) {
        c.status(403);
        return c.json({
            message : "you are not logged in"
        })
    }
})


//add blog
blogRouter.post("/", async (c)=>{
    const body =await c.req.json()
    const {success} = createBlogInput.safeParse(body)
    if(!success) {
        c.status(411);
        return c.json({
            message : "Inputs not correct"
        })
    }
    const authorId = c.get("userId")
    
    const prisma = new PrismaClient({
        datasourceUrl : c.env.PRISMA_ACCELERATE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.post.create({
        data:{
            title : body.title,
            content : body.content,
            authorId : authorId
        }
    })

    return c.json({
        id: blog.id
    })
})

blogRouter.put("/", async(c)=>{
    const body = await c.req.json()
    const {success} = updateBlogInput.safeParse(body)
        if(!success) {
            c.status(411);
            return c.json({
                message : "Inputs not correct"
            })
        }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.PRISMA_ACCELERATE_URL
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

//pagination -> first show first 10, then if user asks more, show more.
blogRouter.get("/bulk", async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.PRISMA_ACCELERATE_URL,
    }).$extends(withAccelerate())
    
    const blog = await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true   
                }
            }
        }
    });

    return c.json({
        blog
    })
})

blogRouter.get("/:id", async (c)=>{
const id = c.req.param("id")
const prisma = new PrismaClient({
    datasourceUrl: c.env.PRISMA_ACCELERATE_URL,
}).$extends(withAccelerate())

try {
    const blog = await prisma.post.findFirst({
        where : {
            id: id
        },
        select:{
            id:true,
            title: true,
            content:true,
            author:{
                select:{
                    name:true,
                }
            }
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



