  import {PrismaClient}  from '@prisma/client/edge'
  import { withAccelerate } from '@prisma/extension-accelerate'
  import { Hono } from 'hono'
  import { decode, sign, verify } from 'hono/jwt'

  const app = new Hono<{
    Bindings: {
      DATABASE_URL : string
      JWT_SECRET:string
    }
  }>();

  app.use('api/v1/blog/*', async(c,next)=>{
    //get the header
    const header = c.req.header("Authorization") || "";
    const token = header.split(" ")[1]
    
    //verfiy the header
    const response = await verify(token, c.env.JWT_SECRET);

    //if header correct, we need can proceed
    if(response.id){
      next();
    }     
    //if header not correct return 403
    else{
      c.status(403)
      c.json({error:"unauthorized"})
    }
  })

  app.post('/api/v1/user/signup', async (c) => {

    const prisma = new PrismaClient({
      //@ts-ignore
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

  app.post('/api/v1/user/signin', async(c) => {
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

// app.post('/api/v1/blog', (c) => {
//   return c.text('Hello Hono!')
// })

// app.put('/api/v1/blog', (c) => {
//   return c.text('Hello Hono!')
// })

// app.get('/api/v1/blog/:id', (c) => {
//   return c.text('Hello Hono!')
// })

// app.get('/api/v1/blog/bulk', (c) => {
//   return c.text('Hello Hono!')
// })

export default app
