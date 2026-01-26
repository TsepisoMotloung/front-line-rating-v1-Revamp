"use strict";(()=>{var e={};e.id=3002,e.ids=[3002],e.modules={67096:e=>{e.exports=require("bcrypt")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},61282:e=>{e.exports=require("child_process")},84770:e=>{e.exports=require("crypto")},80665:e=>{e.exports=require("dns")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},98216:e=>{e.exports=require("net")},19801:e=>{e.exports=require("os")},55315:e=>{e.exports=require("path")},76162:e=>{e.exports=require("stream")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},15942:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>b,patchFetch:()=>y,requestAsyncStorage:()=>f,routeModule:()=>x,serverHooks:()=>v,staticGenerationAsyncStorage:()=>m});var o={};t.r(o),t.d(o,{POST:()=>g});var a=t(49303),i=t(88716),s=t(60670),n=t(87070),d=t(67096),c=t.n(d),l=t(83493),p=t(50650),u=t(36119);async function h(e){try{let r=await fetch("https://hcaptcha.com/siteverify",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:`secret=${encodeURIComponent(process.env.HCAPTCHA_SECRET||"")}&response=${encodeURIComponent(e)}`}),t=await r.json();return!0===t.success}catch(e){return console.error("hCaptcha verification error:",e),!1}}async function g(e){try{let{name:r,email:t,password:o,phone:a,employeeId:i,role:s,departmentId:d,hcaptchaToken:g}=await e.json();if(!g||!await h(g))return n.NextResponse.json({error:"hCaptcha verification failed"},{status:400});if(!r||!t||!o||!s)return n.NextResponse.json({error:"Missing required fields"},{status:400});if(await l.Z.user.findUnique({where:{email:t}}))return n.NextResponse.json({error:"User with this email already exists"},{status:400});if(i&&await l.Z.user.findUnique({where:{employeeId:i}}))return n.NextResponse.json({error:"Employee ID already in use"},{status:400});if("ADMIN"!==s&&!d)return n.NextResponse.json({error:"Department is required for this role"},{status:400});let x=await c().hash(o,10),f=(0,p.zs)(32),m=await l.Z.user.create({data:{name:r,email:t,password:x,role:s,phone:a,employeeId:i,departmentId:"ADMIN"!==s?d:null,status:"PENDING",verificationToken:f},select:{id:!0,name:!0,email:!0,role:!0,status:!0}});try{await (0,u.zk)(t,f)}catch(e){console.error("Failed to send verification email:",e)}return await l.Z.notification.create({data:{userId:m.id,title:"New Registration",message:`New ${s.toLowerCase()} registration from ${r}`,type:"system"}}),n.NextResponse.json({message:"Registration successful. Awaiting admin approval.",user:m},{status:201})}catch(e){return console.error("Registration error:",e),n.NextResponse.json({error:"An error occurred during registration"},{status:500})}}let x=new a.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/auth/register/route",pathname:"/api/auth/register",filename:"route",bundlePath:"app/api/auth/register/route"},resolvedPagePath:"/workspaces/front-line-rating-v1-Revamp/app/api/auth/register/route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:f,staticGenerationAsyncStorage:m,serverHooks:v}=x,b="/api/auth/register/route";function y(){return(0,s.patchFetch)({serverHooks:v,staticGenerationAsyncStorage:m})}},36119:(e,r,t)=>{t.d(r,{LS:()=>s,Xg:()=>d,YW:()=>n,zk:()=>i});let o=t(55245).createTransport({host:process.env.EMAIL_SERVER_HOST,port:Number(process.env.EMAIL_SERVER_PORT),secure:!1,auth:{user:process.env.EMAIL_SERVER_USER,pass:process.env.EMAIL_SERVER_PASSWORD}});async function a({to:e,subject:r,html:t}){try{let a=await o.sendMail({from:process.env.EMAIL_FROM,to:e,subject:r,html:t});return console.log("Email sent:",a.messageId),{success:!0,messageId:a.messageId}}catch(e){return console.error("Error sending email:",e),{success:!1,error:e}}}async function i(e,r){let t=`${process.env.APP_URL}/auth/verify-email?token=${r}`;return a({to:e,subject:"Verify Your Email Address",html:`
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
            <p>Thank you for registering with Service Feedback Platform. Please verify your email address by clicking the button below:</p>
            <div style="text-align: center;">
              <a href="${t}" class="button">Verify Email Address</a>
            </div>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${t}</p>
            <p>This link will expire in 24 hours.</p>
            <p>If you didn't create an account, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Service Feedback Platform. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `})}async function s(e,r){let t=`${process.env.APP_URL}/auth/reset-password?token=${r}`;return a({to:e,subject:"Reset Your Password",html:`
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
            <p>&copy; ${new Date().getFullYear()} Service Feedback Platform. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `})}async function n(e,r,t){let o=`
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
              <p>You can now log in to the Service Feedback Platform using your credentials.</p>
              <div style="text-align: center;">
                <a href="${process.env.APP_URL}/auth/login" class="button">Login Now</a>
              </div>
            `:`
              <p>If you believe this is an error, please contact the system administrator.</p>
            `}
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Service Feedback Platform. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;return a({to:e,subject:`Account ${t?"Approved":"Rejected"}`,html:o})}async function d(e,r,t,o){let i=o?"New Complaint Received":"New Rating Received",s=o?"#dc2626":"#22c55e",n=`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: ${s}; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background-color: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          .rating { font-size: 24px; font-weight: bold; color: ${s}; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${i}</h1>
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
            <p>&copy; ${new Date().getFullYear()} Service Feedback Platform. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;return a({to:e,subject:i,html:n})}},83493:(e,r,t)=>{t.d(r,{Z:()=>a});let o=require("@prisma/client"),a=global.prisma||new o.PrismaClient({log:["error"]})},50650:(e,r,t)=>{t.d(r,{zs:()=>o});function o(e=32){let r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t="";for(let o=0;o<e;o++)t+=r.charAt(Math.floor(Math.random()*r.length));return t}}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[9276,5972,5245],()=>t(15942));module.exports=o})();