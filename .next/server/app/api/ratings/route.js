"use strict";(()=>{var e={};e.id=2098,e.ids=[2098],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},61282:e=>{e.exports=require("child_process")},84770:e=>{e.exports=require("crypto")},80665:e=>{e.exports=require("dns")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},98216:e=>{e.exports=require("net")},19801:e=>{e.exports=require("os")},55315:e=>{e.exports=require("path")},76162:e=>{e.exports=require("stream")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},17043:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>x,patchFetch:()=>f,requestAsyncStorage:()=>g,routeModule:()=>u,serverHooks:()=>m,staticGenerationAsyncStorage:()=>h});var a={};r.r(a),r.d(a,{GET:()=>p,POST:()=>c});var n=r(49303),o=r(88716),s=r(60670),i=r(87070),d=r(83493),l=r(36119);async function c(e){try{let{ratingType:t,agentId:r,customerName:a,customerContact:n,policyNumber:o,isAnonymous:s,isComplaint:c,feedbackText:p,responses:u}=await e.json();if(!a)return i.NextResponse.json({error:"Missing required fields: customerName"},{status:400});if(!u||!Array.isArray(u)||0===u.length)return i.NextResponse.json({error:"At least one response is required"},{status:400});if("ALLIANCE"===t){let t=e.headers.get("x-forwarded-for")||e.headers.get("x-real-ip")||"unknown",r=e.headers.get("user-agent")||"unknown",l=await d.Z.rating.create({data:{ratingType:"ALLIANCE",customerName:a,customerContact:n,policyNumber:o,isAnonymous:s,isComplaint:c,feedbackText:p,complaintStatus:c?"OPEN":void 0,ipAddress:t,userAgent:r,responses:{create:u.map(e=>({questionId:e.questionId,score:e.score}))}},include:{responses:!0}});return i.NextResponse.json({message:"Alliance Insurance rating submitted successfully",rating:{id:l.id}},{status:201})}if("COMPANY"===t){let t=e.headers.get("x-forwarded-for")||e.headers.get("x-real-ip")||"unknown",r=e.headers.get("user-agent")||"unknown",l=await d.Z.rating.create({data:{ratingType:"ALLIANCE",customerName:a,customerContact:n,policyNumber:o,isAnonymous:s,isComplaint:c,feedbackText:p,complaintStatus:c?"OPEN":void 0,ipAddress:t,userAgent:r,responses:{create:u.map(e=>({questionId:e.questionId,score:e.score}))}},include:{responses:!0}});return i.NextResponse.json({message:"Alliance Insurance rating submitted successfully",rating:{id:l.id}},{status:201})}if(!r)return i.NextResponse.json({error:"Missing required fields: agentId"},{status:400});let g=await d.Z.user.findUnique({where:{id:r},include:{department:!0}});if(!g||"AGENT"!==g.role)return i.NextResponse.json({error:"Invalid agent"},{status:400});let h=e.headers.get("x-forwarded-for")||e.headers.get("x-real-ip")||"unknown",m=e.headers.get("user-agent")||"unknown",x=await d.Z.rating.create({data:{agentId:r,departmentId:g.departmentId,customerName:a,customerContact:n,policyNumber:o,isAnonymous:s,isComplaint:c,feedbackText:p,complaintStatus:c?"OPEN":void 0,ipAddress:h,userAgent:m,responses:{create:u.map(e=>({questionId:e.questionId,score:e.score}))}},include:{responses:!0}}),f=u.reduce((e,t)=>e+t.score,0)/u.length;if(await d.Z.notification.create({data:{userId:r,title:c?"New Complaint Received":"New Rating Received",message:`You received a new ${c?"complaint":"rating"} from ${a}`,type:c?"complaint":"rating",link:"/dashboard/my-ratings"}}),c&&g.department)for(let e of(await d.Z.user.findMany({where:{departmentId:g.departmentId,role:"HOD",status:"APPROVED"}})))await d.Z.notification.create({data:{userId:e.id,title:"New Complaint in Your Department",message:`A complaint was filed against ${g.name}`,type:"complaint",link:"/dashboard/complaints"}});try{await (0,l.Xg)(g.email,g.name,f,c)}catch(e){console.error("Failed to send email notification:",e)}return i.NextResponse.json({message:"Rating submitted successfully",rating:{id:x.id,averageScore:f}},{status:201})}catch(e){return console.error("Error submitting rating:",e),i.NextResponse.json({error:"Failed to submit rating"},{status:500})}}async function p(e){try{let t=e.nextUrl.searchParams,r=t.get("ratingType"),a=t.get("userId"),n=t.get("departmentId"),o=t.get("startDate"),s=t.get("endDate"),l=t.get("search"),c=parseInt(t.get("limit")||"100"),p={};r&&(p.ratingType=r),a&&"ALLIANCE"!==r&&(p.agentId=a),n&&"ALLIANCE"!==r&&(p.departmentId=n),(o||s)&&(p.createdAt={},o&&(p.createdAt.gte=new Date(o)),s&&(p.createdAt.lte=new Date(s))),l&&(p.OR=[{customerName:{contains:l}},{feedbackText:{contains:l}}]);let u=(await d.Z.rating.findMany({where:p,include:{agent:{select:{id:!0,name:!0,employeeId:!0}},department:{select:{id:!0,name:!0}},responses:{include:{question:{select:{questionText:!0}}}}},orderBy:{createdAt:"desc"},take:c})).map(e=>({...e,averageScore:e.responses.length>0?e.responses.reduce((e,t)=>e+t.score,0)/e.responses.length:0})),g=u.length,h=g>0?u.reduce((e,t)=>e+t.averageScore,0)/g:0,m=u.filter(e=>"ALLIANCE"===e.ratingType),x=u.filter(e=>"AGENT"===e.ratingType),f=g>0?Math.round(u.filter(e=>e.averageScore>=4).length/g*100):0,y=new Map;u.forEach(e=>{let t=new Date(e.createdAt).toISOString().split("T")[0],r=y.get(t)||{sum:0,count:0};y.set(t,{sum:r.sum+e.averageScore,count:r.count+1})});let v=Array.from(y.entries()).map(([e,t])=>({date:e,average:parseFloat((t.sum/t.count).toFixed(2))})).sort((e,t)=>new Date(e.date).getTime()-new Date(t.date).getTime()).slice(-30),b=[{name:"Alliance",value:m.length},{name:"Employee",value:x.length}],w={totalRatings:g,averageRating:parseFloat(h.toFixed(2)),alliances:m.length,agents:x.length,satisfactionRate:f,trendData:v,ratingsByType:b,topAgents:[]};return i.NextResponse.json({ratings:u,analytics:w})}catch(e){return console.error("Error fetching ratings:",e),i.NextResponse.json({error:"Failed to fetch ratings"},{status:500})}}let u=new n.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/ratings/route",pathname:"/api/ratings",filename:"route",bundlePath:"app/api/ratings/route"},resolvedPagePath:"/workspaces/front-line-rating-v1-Revamp/app/api/ratings/route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:g,staticGenerationAsyncStorage:h,serverHooks:m}=u,x="/api/ratings/route";function f(){return(0,s.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:h})}},36119:(e,t,r)=>{r.d(t,{LS:()=>s,Xg:()=>d,YW:()=>i,zk:()=>o});let a=r(55245).createTransport({host:process.env.EMAIL_SERVER_HOST,port:Number(process.env.EMAIL_SERVER_PORT),secure:!1,auth:{user:process.env.EMAIL_SERVER_USER,pass:process.env.EMAIL_SERVER_PASSWORD}});async function n({to:e,subject:t,html:r}){try{let n=await a.sendMail({from:process.env.EMAIL_FROM,to:e,subject:t,html:r});return console.log("Email sent:",n.messageId),{success:!0,messageId:n.messageId}}catch(e){return console.error("Error sending email:",e),{success:!1,error:e}}}async function o(e,t){let r=`${process.env.APP_URL}/auth/verify-email?token=${t}`;return n({to:e,subject:"Verify Your Email Address",html:`
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
              <a href="${r}" class="button">Verify Email Address</a>
            </div>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${r}</p>
            <p>This link will expire in 24 hours.</p>
            <p>If you didn't create an account, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Frontline Rating System. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `})}async function s(e,t){let r=`${process.env.APP_URL}/auth/reset-password?token=${t}`;return n({to:e,subject:"Reset Your Password",html:`
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
              <a href="${r}" class="button">Reset Password</a>
            </div>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${r}</p>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request a password reset, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Frontline Rating System. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `})}async function i(e,t,r){let a=`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: ${r?"#22c55e":"#dc2626"}; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
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
            <p>Hello ${t},</p>
            <p>Your account registration has been <strong>${r?"approved":"rejected"}</strong>.</p>
            ${r?`
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
  `;return n({to:e,subject:`Account ${r?"Approved":"Rejected"}`,html:a})}async function d(e,t,r,a){let o=a?"New Complaint Received":"New Rating Received",s=a?"#dc2626":"#22c55e",i=`
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
            <h1>${o}</h1>
          </div>
          <div class="content">
            <p>Hello ${t},</p>
            <p>You have received a new ${a?"complaint":"rating"} from a customer.</p>
            ${a?"":`<p class="rating">Average Rating: ${r.toFixed(1)} / 5.0</p>`}
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
  `;return n({to:e,subject:o,html:i})}},83493:(e,t,r)=>{r.d(t,{Z:()=>n});let a=require("@prisma/client"),n=global.prisma||new a.PrismaClient({log:["error"]})}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[9276,5972,5245],()=>r(17043));module.exports=a})();