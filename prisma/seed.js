const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data (optional - comment out in production)
  console.log('🗑️  Clearing existing data...');
  await prisma.response.deleteMany();
  await prisma.rating.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.profileUpdateRequest.deleteMany();
  await prisma.question.deleteMany();
  await prisma.user.deleteMany();
  await prisma.department.deleteMany();
  await prisma.systemSettings.deleteMany();

  // Create Admin User
  console.log('👤 Creating admin user...');
  const hashedAdminPassword = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@frontlinerating.com',
      name: 'System Administrator',
      password: hashedAdminPassword,
      role: 'ADMIN',
      status: 'APPROVED',
      emailVerified: new Date(),
      employeeId: 'ADMIN001',
    },
  });
  console.log('✅ Admin created:', admin.email);

  // Create Departments
  console.log('🏢 Creating departments...');
  const salesDept = await prisma.department.create({
    data: {
      name: 'Sales Department',
      description: 'Handles all sales and customer acquisition activities',
      isActive: true,
    },
  });

  const customerServiceDept = await prisma.department.create({
    data: {
      name: 'Customer Service',
      description: 'Handles customer inquiries and support',
      isActive: true,
    },
  });

  const claimsDept = await prisma.department.create({
    data: {
      name: 'Claims Department',
      description: 'Processes insurance claims and related services',
      isActive: true,
    },
  });

  console.log('✅ Departments created');

  // Create HOD Users
  console.log('👔 Creating HOD users...');
  const hashedHodPassword = await bcrypt.hash('Hod@123', 10);
  
  const salesHod = await prisma.user.create({
    data: {
      email: 'hod.sales@frontlinerating.com',
      name: 'Sarah Johnson',
      password: hashedHodPassword,
      role: 'HOD',
      status: 'APPROVED',
      departmentId: salesDept.id,
      emailVerified: new Date(),
      employeeId: 'HOD001',
      phone: '+266 5000 1001',
    },
  });

  const csHod = await prisma.user.create({
    data: {
      email: 'hod.cs@frontlinerating.com',
      name: 'Michael Chen',
      password: hashedHodPassword,
      role: 'HOD',
      status: 'APPROVED',
      departmentId: customerServiceDept.id,
      emailVerified: new Date(),
      employeeId: 'HOD002',
      phone: '+266 5000 1002',
    },
  });

  const claimsHod = await prisma.user.create({
    data: {
      email: 'hod.claims@frontlinerating.com',
      name: 'Patricia Williams',
      password: hashedHodPassword,
      role: 'HOD',
      status: 'APPROVED',
      departmentId: claimsDept.id,
      emailVerified: new Date(),
      employeeId: 'HOD003',
      phone: '+266 5000 1003',
    },
  });

  console.log('✅ HODs created');

  // Create Agent Users
  console.log('👥 Creating agent users...');
  const hashedAgentPassword = await bcrypt.hash('Agent@123', 10);
  
  const agents = await Promise.all([
    prisma.user.create({
      data: {
        email: 'agent1.sales@frontlinerating.com',
        name: 'John Smith',
        password: hashedAgentPassword,
        role: 'AGENT',
        status: 'APPROVED',
        departmentId: salesDept.id,
        emailVerified: new Date(),
        employeeId: 'AGT001',
        phone: '+266 5000 2001',
      },
    }),
    prisma.user.create({
      data: {
        email: 'agent2.sales@frontlinerating.com',
        name: 'Emily Davis',
        password: hashedAgentPassword,
        role: 'AGENT',
        status: 'APPROVED',
        departmentId: salesDept.id,
        emailVerified: new Date(),
        employeeId: 'AGT002',
        phone: '+266 5000 2002',
      },
    }),
    prisma.user.create({
      data: {
        email: 'agent1.cs@frontlinerating.com',
        name: 'Robert Brown',
        password: hashedAgentPassword,
        role: 'AGENT',
        status: 'APPROVED',
        departmentId: customerServiceDept.id,
        emailVerified: new Date(),
        employeeId: 'AGT003',
        phone: '+266 5000 2003',
      },
    }),
    prisma.user.create({
      data: {
        email: 'agent2.cs@frontlinerating.com',
        name: 'Jennifer Martinez',
        password: hashedAgentPassword,
        role: 'AGENT',
        status: 'APPROVED',
        departmentId: customerServiceDept.id,
        emailVerified: new Date(),
        employeeId: 'AGT004',
        phone: '+266 5000 2004',
      },
    }),
    prisma.user.create({
      data: {
        email: 'agent1.claims@frontlinerating.com',
        name: 'David Wilson',
        password: hashedAgentPassword,
        role: 'AGENT',
        status: 'APPROVED',
        departmentId: claimsDept.id,
        emailVerified: new Date(),
        employeeId: 'AGT005',
        phone: '+266 5000 2005',
      },
    }),
  ]);

  console.log('✅ Agents created');

  // Create Questions for Each Department
  console.log('❓ Creating rating questions...');
  
  // Sales Department Questions
  await prisma.question.createMany({
    data: [
      {
        departmentId: salesDept.id,
        questionText: 'How would you rate the agent\'s product knowledge?',
        order: 1,
        isActive: true,
      },
      {
        departmentId: salesDept.id,
        questionText: 'How satisfied are you with the clarity of information provided?',
        order: 2,
        isActive: true,
      },
      {
        departmentId: salesDept.id,
        questionText: 'How would you rate the agent\'s professionalism?',
        order: 3,
        isActive: true,
      },
      {
        departmentId: salesDept.id,
        questionText: 'How likely are you to recommend our services based on this interaction?',
        order: 4,
        isActive: true,
      },
    ],
  });

  // Customer Service Questions
  await prisma.question.createMany({
    data: [
      {
        departmentId: customerServiceDept.id,
        questionText: 'How would you rate the agent\'s responsiveness?',
        order: 1,
        isActive: true,
      },
      {
        departmentId: customerServiceDept.id,
        questionText: 'How satisfied are you with the resolution provided?',
        order: 2,
        isActive: true,
      },
      {
        departmentId: customerServiceDept.id,
        questionText: 'How would you rate the agent\'s communication skills?',
        order: 3,
        isActive: true,
      },
      {
        departmentId: customerServiceDept.id,
        questionText: 'How professional was the agent during your interaction?',
        order: 4,
        isActive: true,
      },
    ],
  });

  // Claims Department Questions
  await prisma.question.createMany({
    data: [
      {
        departmentId: claimsDept.id,
        questionText: 'How would you rate the speed of claims processing?',
        order: 1,
        isActive: true,
      },
      {
        departmentId: claimsDept.id,
        questionText: 'How clear was the explanation of the claims process?',
        order: 2,
        isActive: true,
      },
      {
        departmentId: claimsDept.id,
        questionText: 'How would you rate the agent\'s empathy and understanding?',
        order: 3,
        isActive: true,
      },
      {
        departmentId: claimsDept.id,
        questionText: 'How satisfied are you with the overall claims experience?',
        order: 4,
        isActive: true,
      },
    ],
  });

  console.log('✅ Questions created');

  // Create Sample Ratings
  console.log('⭐ Creating sample ratings...');
  
  const salesQuestions = await prisma.question.findMany({
    where: { departmentId: salesDept.id },
  });

  const csQuestions = await prisma.question.findMany({
    where: { departmentId: customerServiceDept.id },
  });

  // Sample rating for Sales Agent 1
  const rating1 = await prisma.rating.create({
    data: {
      agentId: agents[0].id,
      departmentId: salesDept.id,
      customerName: 'Customer One',
      customerContact: '+266 5800 0001',
      policyNumber: 'POL001234',
      feedbackText: 'Excellent service! Very knowledgeable and helpful.',
      isComplaint: false,
      responses: {
        create: salesQuestions.map((q, idx) => ({
          questionId: q.id,
          score: idx % 2 === 0 ? 5 : 4,
        })),
      },
    },
  });

  // Sample rating for Customer Service Agent 1
  const rating2 = await prisma.rating.create({
    data: {
      agentId: agents[2].id,
      departmentId: customerServiceDept.id,
      customerName: 'Customer Two',
      customerContact: '+266 5800 0002',
      policyNumber: 'POL001235',
      feedbackText: 'Quick response and resolved my issue efficiently.',
      isComplaint: false,
      responses: {
        create: csQuestions.map((q) => ({
          questionId: q.id,
          score: 5,
        })),
      },
    },
  });

  // Sample complaint
  const complaint = await prisma.rating.create({
    data: {
      agentId: agents[1].id,
      departmentId: salesDept.id,
      customerName: 'Customer Three',
      customerContact: '+266 5800 0003',
      feedbackText: 'Agent was not very helpful and seemed rushed.',
      isComplaint: true,
      complaintStatus: 'OPEN',
      responses: {
        create: salesQuestions.map((q) => ({
          questionId: q.id,
          score: 2,
        })),
      },
    },
  });

  console.log('✅ Sample ratings created');

  // Create System Settings
  console.log('⚙️ Creating system settings...');
  await prisma.systemSettings.createMany({
    data: [
      {
        key: 'app_name',
        value: 'Frontline Rating System',
      },
      {
        key: 'allow_anonymous_ratings',
        value: 'true',
      },
      {
        key: 'require_policy_number',
        value: 'false',
      },
      {
        key: 'email_notifications_enabled',
        value: 'true',
      },
    ],
  });

  console.log('✅ System settings created');

  console.log('\n✨ Database seed completed successfully!\n');
  console.log('📝 Default Login Credentials:');
  console.log('─────────────────────────────────────────');
  console.log('Admin:');
  console.log('  Email: admin@frontlinerating.com');
  console.log('  Password: Admin@123');
  console.log('');
  console.log('HOD (Sales):');
  console.log('  Email: hod.sales@frontlinerating.com');
  console.log('  Password: Hod@123');
  console.log('');
  console.log('HOD (Customer Service):');
  console.log('  Email: hod.cs@frontlinerating.com');
  console.log('  Password: Hod@123');
  console.log('');
  console.log('HOD (Claims):');
  console.log('  Email: hod.claims@frontlinerating.com');
  console.log('  Password: Hod@123');
  console.log('');
  console.log('Agent (Sales):');
  console.log('  Email: agent1.sales@frontlinerating.com');
  console.log('  Password: Agent@123');
  console.log('');
  console.log('Agent (Customer Service):');
  console.log('  Email: agent1.cs@frontlinerating.com');
  console.log('  Password: Agent@123');
  console.log('');
  console.log('Agent (Claims):');
  console.log('  Email: agent1.claims@frontlinerating.com');
  console.log('  Password: Agent@123');
  console.log('─────────────────────────────────────────\n');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });