const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.response.deleteMany();
  await prisma.rating.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.profileUpdateRequest.deleteMany();
  await prisma.allianceInsuranceQuestion.deleteMany();
  await prisma.question.deleteMany();
  await prisma.internalRating.deleteMany();
  await prisma.user.deleteMany();
  await prisma.department.deleteMany();
  await prisma.systemSettings.deleteMany();
  console.log('✅ Database cleared');

  // Create Departments
  console.log('🏢 Creating departments...');
  const salesDept = await prisma.department.create({
    data: {
      name: 'Sales',
      description: 'Sales Department',
      isActive: true,
    },
  });

  const hrDept = await prisma.department.create({
    data: {
      name: 'Human Resources',
      description: 'HR Department',
      isActive: true,
    },
  });

  const operationsDept = await prisma.department.create({
    data: {
      name: 'Operations',
      description: 'Operations Department',
      isActive: true,
    },
  });

  console.log('✅ Departments created');

  // Hash password for all users
  const hashedPassword = await bcrypt.hash('Pass@123', 10);

  // Create Admin User
  console.log('👤 Creating admin user...');
  const admin = await prisma.user.create({
    data: {
      email: 'mseqhobane@alliance.co.ls',
      name: 'Max Seqhobane',
      password: hashedPassword,
      role: 'ADMIN',
      status: 'APPROVED',
      emailVerified: new Date(),
      employeeId: 'ADMIN001',
    },
  });
  console.log('✅ Admin created:', admin.email);

  // Create HOD User
  console.log('👔 Creating HOD user...');
  const hod = await prisma.user.create({
    data: {
      email: 'pmalehi@alliance.co.ls',
      name: 'Paballo Malehi',
      password: hashedPassword,
      role: 'HOD',
      status: 'APPROVED',
      departmentId: salesDept.id,
      emailVerified: new Date(),
      employeeId: 'HOD001',
      phone: '+266 2000 0001',
    },
  });
  console.log('✅ HOD created:', hod.email);

  // Create Sales Agent (AGENT role)
  console.log('🧑‍💼 Creating sales agent...');
  const salesAgent = await prisma.user.create({
    data: {
      email: 'rmojakisane@alliance.co.ls',
      name: 'Ramonaheng Mojakisane',
      password: hashedPassword,
      role: 'AGENT',
      status: 'APPROVED',
      departmentId: salesDept.id,
      emailVerified: new Date(),
      employeeId: 'AGENT001',
      phone: '+266 2000 0002',
    },
  });
  console.log('✅ Sales Agent created:', salesAgent.email);

  // Create Employee
  console.log('👥 Creating employee...');
  const employee = await prisma.user.create({
    data: {
      email: 'tmotloung@alliance.co.ls',
      name: 'Tsepiso Motloung',
      password: hashedPassword,
      role: 'EMPLOYEE',
      status: 'APPROVED',
      departmentId: salesDept.id,
      emailVerified: new Date(),
      employeeId: 'EMP001',
      phone: '+266 2000 0003',
    },
  });
  console.log('✅ Employee created:', employee.email);

  console.log('\n✨ Database seed completed successfully!\n');
  console.log('📝 User Credentials:');
  console.log('─────────────────────────────────────────');
  console.log('Admin:');
  console.log('  Email: mseqhobane@alliance.co.ls');
  console.log('  Name: Max Seqhobane');
  console.log('  Password: Pass@123');
  console.log('');
  console.log('HOD (Sales):');
  console.log('  Email: pmalehi@alliance.co.ls');
  console.log('  Name: Paballo Malehi');
  console.log('  Password: Pass@123');
  console.log('');
  console.log('Sales Agent:');
  console.log('  Email: rmojakisane@alliance.co.ls');
  console.log('  Name: Ramonaheng Mojakisane');
  console.log('  Password: Pass@123');
  console.log('');
  console.log('Employee (HR):');
  console.log('  Email: tmotloung@alliance.co.ls');
  console.log('  Name: Tsepiso Motloung');
  console.log('  Password: Pass@123');
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