"use strict";(()=>{var e={};e.id=9118,e.ids=[9118],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},61282:e=>{e.exports=require("child_process")},84770:e=>{e.exports=require("crypto")},80665:e=>{e.exports=require("dns")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},98216:e=>{e.exports=require("net")},19801:e=>{e.exports=require("os")},55315:e=>{e.exports=require("path")},76162:e=>{e.exports=require("stream")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},85996:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>m,patchFetch:()=>f,requestAsyncStorage:()=>h,routeModule:()=>u,serverHooks:()=>x,staticGenerationAsyncStorage:()=>g});var o={};t.r(o),t.d(o,{POST:()=>c});var a=t(49303),s=t(88716),i=t(60670),n=t(87070),d=t(83493),l=t(50650),p=t(36119);async function c(e){try{let{email:r}=await e.json();if(!r)return n.NextResponse.json({error:"Email is required"},{status:400});let t=await d.Z.user.findUnique({where:{email:r}});if(!t)return n.NextResponse.json({message:"If an account with that email exists, a password reset link has been sent."});let o=(0,l.zs)(32),a=new Date(Date.now()+36e5);await d.Z.user.update({where:{id:t.id},data:{resetToken:o,resetTokenExpiry:a}});try{await (0,p.LS)(r,o)}catch(e){return console.error("Failed to send password reset email:",e),n.NextResponse.json({error:"Failed to send reset email. Please try again."},{status:500})}return n.NextResponse.json({message:"If an account with that email exists, a password reset link has been sent."})}catch(e){return console.error("Forgot password error:",e),n.NextResponse.json({error:"An error occurred. Please try again."},{status:500})}}let u=new a.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/auth/forgot-password/route",pathname:"/api/auth/forgot-password",filename:"route",bundlePath:"app/api/auth/forgot-password/route"},resolvedPagePath:"/workspaces/front-line-rating-v1-Revamp/app/api/auth/forgot-password/route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:h,staticGenerationAsyncStorage:g,serverHooks:x}=u,m="/api/auth/forgot-password/route";function f(){return(0,i.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:g})}},36119:(e,r,t)=>{t.d(r,{LS:()=>i,Xg:()=>d,YW:()=>n,zk:()=>s});let o=t(55245).createTransport({host:process.env.EMAIL_SERVER_HOST,port:Number(process.env.EMAIL_SERVER_PORT),secure:!1,auth:{user:process.env.EMAIL_SERVER_USER,pass:process.env.EMAIL_SERVER_PASSWORD}});async function a({to:e,subject:r,html:t}){try{let a=await o.sendMail({from:process.env.EMAIL_FROM,to:e,subject:r,html:t});return console.log("Email sent:",a.messageId),{success:!0,messageId:a.messageId}}catch(e){return console.error("Error sending email:",e),{success:!1,error:e}}}async function s(e,r){let t=`${process.env.APP_URL}/auth/verify-email?token=${r}`;return a({to:e,subject:"Verify Your Email Address",html:`
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
  `})}async function i(e,r){let t=`${process.env.APP_URL}/auth/reset-password?token=${r}`;return a({to:e,subject:"Reset Your Password",html:`
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
  `;return a({to:e,subject:`Account ${t?"Approved":"Rejected"}`,html:o})}async function d(e,r,t,o){let s=o?"New Complaint Received":"New Rating Received",i=o?"#dc2626":"#22c55e",n=`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: ${i}; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background-color: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          .rating { font-size: 24px; font-weight: bold; color: ${i}; }
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
  `;return a({to:e,subject:s,html:n})}},83493:(e,r,t)=>{t.d(r,{Z:()=>a});let o=require("@prisma/client"),a=global.prisma||new o.PrismaClient({log:["error"]})},50650:(e,r,t)=>{t.d(r,{zs:()=>o});function o(e=32){let r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t="";for(let o=0;o<e;o++)t+=r.charAt(Math.floor(Math.random()*r.length));return t}}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[9276,5972,5245],()=>t(85996));module.exports=o})();