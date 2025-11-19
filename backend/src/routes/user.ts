import {PrismaClient}  from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { signinInput, signupIput } from "@aryan-jha/medium-common"


export const userRouter = new Hono<{
    Bindings: {
      PRISMA_ACCELERATE_URL : string
      JWT_SECRET:string
    }
  }>();


//signup
userRouter.post('/signup', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.PRISMA_ACCELERATE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()

    const {success} = signupIput.safeParse(body)
    if(!success) {
        c.status(411);
        return c.json({
            message : "Inputs not correct"
        })
    }

    const user = await prisma.user.create({
        data:{
        email: body.email,
        password:body.password,
        name : body.name
        }
    })
    const token = await sign({id:user.id},c.env.JWT_SECRET)
    return c.json({token})
})


//sign in
userRouter.post('/signin', async(c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl : c.env.PRISMA_ACCELERATE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();

    const {success} = signinInput.safeParse(body)
    if(!success) {
        c.status(411);
        return c.json({
            message : "Inputs not correct"
        })
    }

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