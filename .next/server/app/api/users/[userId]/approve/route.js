"use strict";(()=>{var e={};e.id=8810,e.ids=[8810],e.modules={67096:e=>{e.exports=require("bcrypt")},72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},27790:e=>{e.exports=require("assert")},78893:e=>{e.exports=require("buffer")},61282:e=>{e.exports=require("child_process")},84770:e=>{e.exports=require("crypto")},80665:e=>{e.exports=require("dns")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},98216:e=>{e.exports=require("net")},19801:e=>{e.exports=require("os")},55315:e=>{e.exports=require("path")},86624:e=>{e.exports=require("querystring")},76162:e=>{e.exports=require("stream")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},25850:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>v,patchFetch:()=>y,requestAsyncStorage:()=>m,routeModule:()=>h,serverHooks:()=>g,staticGenerationAsyncStorage:()=>x});var o={};t.r(o),t.d(o,{PUT:()=>u});var a=t(49303),s=t(88716),n=t(60670),i=t(87070),d=t(75571),p=t(90455),l=t(83493),c=t(36119);async function u(e,{params:r}){try{let e=await (0,d.getServerSession)(p.L);if(!e||"ADMIN"!==e.user.role)return i.NextResponse.json({error:"Unauthorized"},{status:401});let t=await l.Z.user.findUnique({where:{id:r.userId}});if(!t)return i.NextResponse.json({error:"User not found"},{status:404});let o=await l.Z.user.update({where:{id:r.userId},data:{status:"APPROVED"}});try{await (0,c.YW)(t.email,t.name,!0)}catch(e){console.error("Failed to send approval email:",e)}return await l.Z.notification.create({data:{userId:r.userId,title:"Account Approved",message:"Your account has been approved. You can now login to the system.",type:"system"}}),i.NextResponse.json(o)}catch(e){return console.error("Error approving user:",e),i.NextResponse.json({error:"Failed to approve user"},{status:500})}}let h=new a.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/users/[userId]/approve/route",pathname:"/api/users/[userId]/approve",filename:"route",bundlePath:"app/api/users/[userId]/approve/route"},resolvedPagePath:"/workspaces/front-line-rating-v1-Revamp/app/api/users/[userId]/approve/route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:m,staticGenerationAsyncStorage:x,serverHooks:g}=h,v="/api/users/[userId]/approve/route";function y(){return(0,n.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:x})}},90455:(e,r,t)=>{t.d(r,{L:()=>d});var o=t(53797),a=t(67096),s=t.n(a),n=t(83493);async function i(e){try{let r=await fetch("https://hcaptcha.com/siteverify",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:`secret=${encodeURIComponent(process.env.HCAPTCHA_SECRET||"")}&response=${encodeURIComponent(e)}`}),t=await r.json();return!0===t.success}catch(e){return console.error("hCaptcha verification error:",e),!1}}let d={providers:[(0,o.Z)({name:"Credentials",credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"},hcaptchaToken:{label:"hCaptcha Token",type:"text"}},async authorize(e,r){if(!e?.email||!e?.password)throw Error("Please enter your email and password");if(!e?.hcaptchaToken||!await i(e.hcaptchaToken))throw Error("hCaptcha verification failed");let t=await n.Z.user.findUnique({where:{email:e.email},include:{department:!0}});if(!t)throw Error("No user found with this email");if("PENDING"===t.status)throw Error("Your account is pending approval");if("REJECTED"===t.status)throw Error("Your account has been rejected");if(!await s().compare(e.password,t.password))throw Error("Invalid password");return{id:t.id,email:t.email,name:t.name,role:t.role,departmentId:t.departmentId??void 0,departmentName:t.department?.name,status:t.status}}})],callbacks:{jwt:async({token:e,user:r})=>(r&&(e.id=r.id,e.role=r.role,e.departmentId=r.departmentId,e.departmentName=r.departmentName,e.status=r.status),e),session:async({session:e,token:r})=>(e.user&&(e.user.id=r.id,e.user.role=r.role,e.user.departmentId=r.departmentId,e.user.departmentName=r.departmentName,e.user.status=r.status),e)},pages:{signIn:"/auth/login",error:"/auth/login"},session:{strategy:"jwt",maxAge:2592e3},secret:process.env.NEXTAUTH_SECRET}},36119:(e,r,t)=>{t.d(r,{LS:()=>n,Xg:()=>d,YW:()=>i,zk:()=>s});let o=t(55245).createTransport({host:process.env.EMAIL_SERVER_HOST,port:Number(process.env.EMAIL_SERVER_PORT),secure:!1,auth:{user:process.env.EMAIL_SERVER_USER,pass:process.env.EMAIL_SERVER_PASSWORD}});async function a({to:e,subject:r,html:t}){try{let a=await o.sendMail({from:process.env.EMAIL_FROM,to:e,subject:r,html:t});return console.log("Email sent:",a.messageId),{success:!0,messageId:a.messageId}}catch(e){return console.error("Error sending email:",e),{success:!1,error:e}}}async function s(e,r){let t=`${process.env.APP_URL}/auth/verify-email?token=${r}`;return a({to:e,subject:"Verify Your Email Address",html:`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background-color: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Email Verification</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>Thank you for registering with Frontline Rating System. Please verify your email address by clicking the button below:</p>
            <div style="text-align: center;">
              <a href="${t}" class="button">Verify Email Address</a>
            </div>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${t}</p>
            <p>This link will expire in 24 hours.</p>
            <p>If you didn't create an account, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Frontline Rating System. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `})}async function n(e,r){let t=`${process.env.APP_URL}/auth/reset-password?token=${r}`;return a({to:e,subject:"Reset Your Password",html:`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background-color: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>We received a request to reset your password. Click the button below to create a new password:</p>
            <div style="text-align: center;">
              <a href="${t}" class="button">Reset Password</a>
            </div>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${t}</p>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request a password reset, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Frontline Rating System. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `})}async function i(e,r,t){let o=`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: ${t?"#22c55e":"#dc2626"}; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background-color: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Account Status Update</h1>
          </div>
          <div class="content">
            <p>Hello ${r},</p>
            <p>Your account registration has been <strong>${t?"approved":"rejected"}</strong>.</p>
            ${t?`
              <p>You can now log in to the Frontline Rating System using your credentials.</p>
              <div style="text-align: center;">
                <a href="${process.env.APP_URL}/auth/login" class="button">Login Now</a>
              </div>
            `:`
              <p>If you believe this is an error, please contact the system administrator.</p>
            `}
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Frontline Rating System. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;return a({to:e,subject:`Account ${t?"Approved":"Rejected"}`,html:o})}async function d(e,r,t,o){let s=o?"New Complaint Received":"New Rating Received",n=o?"#dc2626":"#22c55e",i=`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: ${n}; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background-color: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          .rating { font-size: 24px; font-weight: bold; color: ${n}; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${s}</h1>
          </div>
          <div class="content">
            <p>Hello ${r},</p>
            <p>You have received a new ${o?"complaint":"rating"} from a customer.</p>
            ${o?"":`<p class="rating">Average Rating: ${t.toFixed(1)} / 5.0</p>`}
            <div style="text-align: center;">
              <a href="${process.env.APP_URL}/dashboard" class="button">View Details</a>
            </div>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Frontline Rating System. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;return a({to:e,subject:s,html:i})}},83493:(e,r,t)=>{t.d(r,{Z:()=>a});let o=require("@prisma/client"),a=global.prisma||new o.PrismaClient({log:["error"]})}};var r=require("../../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[9276,5972,1790,5245],()=>t(25850));module.exports=o})();