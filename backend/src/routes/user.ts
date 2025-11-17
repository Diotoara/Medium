import {PrismaClient}  from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL : string
      JWT_SECRET:string
    }
  }>();


//signup
userRouter.post('/signup', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())


    const body = await c.req.json()
    const find = await prisma.user.findUnique({
        where:{
        email : body.email
        }
    })
    if(find){
        c.status(403)
        return c.json({message:"this email already exists, sign in."})
    }
    const user = await prisma.user.create({
        data:{
        email: body.email,
        password:body.password
        }
    })
    const token = await sign({id:user.id},c.env.JWT_SECRET)
    return c.json({token})
})


//sign in
userRouter.post('/signin', async(c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();

    const user = await prisma.user.findUnique({
        where:{
        email : body.email,
        password:body.password
        }
    })
    if(!user){
        c.status(403)
        return c.json({error:"Incorrect Email or Password"})
    }
    const token = await sign({id:user.id},c.env.JWT_SECRET)
    return c.json({token})

})