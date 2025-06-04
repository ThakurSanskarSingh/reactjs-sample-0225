import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data (optional - remove if you want to preserve existing data)
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️ Cleared existing data');

  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        id: 'user-1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://picsum.photos/id/64/200/200',
        walletAddress: '0x742d35Cc6639Cf532793a3c7b5F15e6e3e6e8e6a',
        role: Role.MANAGER,
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01'),
      },
    }),
    prisma.user.create({
      data: {
        id: 'user-2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        avatar: 'https://picsum.photos/id/91/200/200',
        walletAddress: '0x8ba1f109551bD432803012645Hac136c34B3e8e6',
        role: Role.MEMBER,
        createdAt: new Date('2025-01-02'),
        updatedAt: new Date('2025-01-02'),
      },
    }),
    prisma.user.create({
      data: {
        id: 'user-3',
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        avatar: 'https://picsum.photos/id/177/200/200',
        walletAddress: '0x123f109551bD432803012645Hac136c34B3e8e7',
        role: Role.MEMBER,
        createdAt: new Date('2025-01-03'),
        updatedAt: new Date('2025-01-03'),
      },
    }),
    prisma.user.create({
      data: {
        id: 'user-4',
        name: 'Alice Brown',
        email: 'alice.brown@example.com',
        avatar: 'https://picsum.photos/id/225/200/200',
        walletAddress: null, // User without wallet
        role: Role.MEMBER,
        createdAt: new Date('2025-01-04'),
        updatedAt: new Date('2025-01-04'),
      },
    }),
    prisma.user.create({
      data: {
        id: 'user-5',
        name: 'Charlie Wilson',
        email: 'charlie.wilson@example.com',
        avatar: 'https://picsum.photos/id/342/200/200',
        walletAddress: '0x456f109551bD432803012645Hac136c34B3e8e8',
        role: Role.MEMBER,
        createdAt: new Date('2025-01-05'),
        updatedAt: new Date('2025-01-05'),
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Create tasks
  const tasks = await Promise.all([
    // DONE tasks
    prisma.task.create({
      data: {
        id: 'task-1',
        title: 'Design Task Board UI',
        description: 'Create wireframes and mockups for the task board interface using Figma. Include responsive design considerations and user experience best practices.',
        status: 'DONE',
        priority: 'HIGH',
        dueDate: new Date('2025-06-05'),
        createdAt: new Date('2025-06-01'),
        updatedAt: new Date('2025-06-04'),
        assigneeId: 'user-4', // Alice Brown (Designer)
        creatorId: 'user-1', // John Doe (PM)
      },
    }),
    prisma.task.create({
      data: {
        id: 'task-2',
        title: 'Setup Project Repository',
        description: 'Initialize Next.js project with TypeScript, Tailwind CSS, and Prisma. Setup GitHub repository with proper branch protection rules.',
        status: 'DONE',
        priority: 'HIGH',
        dueDate: new Date('2025-06-03'),
        createdAt: new Date('2025-06-01'),
        updatedAt: new Date('2025-06-02'),
        assigneeId: 'user-2', // Jane Smith
        creatorId: 'user-1', // John Doe
      },
    }),
    prisma.task.create({
      data: {
        id: 'task-3',
        title: 'Create Database Schema',
        description: 'Design and implement Prisma schema for users, tasks, and related entities. Include proper relationships and constraints.',
        status: 'DONE',
        priority: 'MEDIUM',
        dueDate: new Date('2025-06-04'),
        createdAt: new Date('2025-06-02'),
        updatedAt: new Date('2025-06-03'),
        assigneeId: 'user-3', // Bob Johnson
        creatorId: 'user-1', // John Doe
      },
    }),

    // IN_PROGRESS tasks
    prisma.task.create({
      data: {
        id: 'task-4',
        title: 'Implement Drag & Drop Functionality',
        description: 'Add drag and drop functionality for task management using HTML5 drag API. Ensure smooth user experience and proper state management.',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        dueDate: new Date('2025-06-08'),
        createdAt: new Date('2025-06-02'),
        updatedAt: new Date('2025-06-05'),
        assigneeId: 'user-2', // Jane Smith
        creatorId: 'user-1', // John Doe
      },
    }),
    prisma.task.create({
      data: {
        id: 'task-5',
        title: 'Setup Web3 Integration',
        description: 'Integrate Web3.js for blockchain functionality. Implement wallet connection, transaction handling, and user authentication via MetaMask.',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        dueDate: new Date('2025-06-10'),
        createdAt: new Date('2025-06-03'),
        updatedAt: new Date('2025-06-05'),
        assigneeId: 'user-3', // Bob Johnson
        creatorId: 'user-1', // John Doe
      },
    }),
    prisma.task.create({
      data: {
        id: 'task-6',
        title: 'Implement Task Filtering & Search',
        description: 'Add advanced filtering and search capabilities. Include filters by status, priority, assignee, and date ranges.',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        dueDate: new Date('2025-06-09'),
        createdAt: new Date('2025-06-04'),
        updatedAt: new Date('2025-06-05'),
        assigneeId: 'user-5', // Charlie Wilson
        creatorId: 'user-1', // John Doe
      },
    }),

    // TODO tasks
    prisma.task.create({
      data: {
        id: 'task-7',
        title: 'Write Unit Tests',
        description: 'Create comprehensive test cases using Jest and React Testing Library. Aim for at least 80% code coverage.',
        status: 'TODO',
        priority: 'MEDIUM',
        dueDate: new Date('2025-06-12'),
        createdAt: new Date('2025-06-03'),
        updatedAt: new Date('2025-06-03'),
        assigneeId: 'user-4', // Alice Brown
        creatorId: 'user-1', // John Doe
      },
    }),
    prisma.task.create({
      data: {
        id: 'task-8',
        title: 'Implement User Authentication',
        description: 'Add user authentication system with email/password and social login options. Include proper session management.',
        status: 'TODO',
        priority: 'HIGH',
        dueDate: new Date('2025-06-11'),
        createdAt: new Date('2025-06-04'),
        updatedAt: new Date('2025-06-04'),
        assigneeId: 'user-2', // Jane Smith
        creatorId: 'user-1', // John Doe
      },
    }),
    prisma.task.create({
      data: {
        id: 'task-9',
        title: 'Setup CI/CD Pipeline',
        description: 'Configure GitHub Actions for automated testing, building, and deployment. Include proper environment management.',
        status: 'TODO',
        priority: 'MEDIUM',
        dueDate: new Date('2025-06-13'),
        createdAt: new Date('2025-06-04'),
        updatedAt: new Date('2025-06-04'),
        assigneeId: 'user-3', // Bob Johnson
        creatorId: 'user-1', // John Doe
      },
    }),
    prisma.task.create({
      data: {
        id: 'task-10',
        title: 'Create Task Comments System',
        description: 'Implement commenting functionality for tasks. Include real-time updates and notification system.',
        status: 'TODO',
        priority: 'LOW',
        dueDate: new Date('2025-06-15'),
        createdAt: new Date('2025-06-05'),
        updatedAt: new Date('2025-06-05'),
        assigneeId: 'user-5', // Charlie Wilson
        creatorId: 'user-1', // John Doe
      },
    }),
    prisma.task.create({
      data: {
        id: 'task-11',
        title: 'Mobile Responsive Design',
        description: 'Ensure the application works perfectly on mobile devices. Optimize touch interactions and mobile UX.',
        status: 'TODO',
        priority: 'MEDIUM',
        dueDate: new Date('2025-06-14'),
        createdAt: new Date('2025-06-05'),
        updatedAt: new Date('2025-06-05'),
        assigneeId: 'user-4', // Alice Brown
        creatorId: 'user-1', // John Doe
      },
    }),
    prisma.task.create({
      data: {
        id: 'task-12',
        title: 'Performance Optimization',
        description: 'Optimize application performance including bundle size, lazy loading, and database query optimization.',
        status: 'TODO',
        priority: 'LOW',
        dueDate: new Date('2025-06-16'),
        createdAt: new Date('2025-06-05'),
        updatedAt: new Date('2025-06-05'),
        assigneeId: 'user-2', // Jane Smith
        creatorId: 'user-1', // John Doe
      },
    }),

    // High priority urgent tasks
    prisma.task.create({
      data: {
        id: 'task-13',
        title: 'Fix Critical Security Vulnerability',
        description: 'Address the recently discovered XSS vulnerability in the task description rendering. This is blocking the production release.',
        status: 'TODO',
        priority: 'HIGH',
        dueDate: new Date('2025-06-06'),
        createdAt: new Date('2025-06-05'),
        updatedAt: new Date('2025-06-05'),
        assigneeId: 'user-3', // Bob Johnson
        creatorId: 'user-1', // John Doe
      },
    }),

    // Tasks for different scenarios
    prisma.task.create({
      data: {
        id: 'task-14',
        title: 'Update Documentation',
        description: 'Update README.md, API documentation, and deployment guides. Include screenshots and code examples.',
        status: 'TODO',
        priority: 'LOW',
        dueDate: new Date('2025-06-18'),
        createdAt: new Date('2025-06-05'),
        updatedAt: new Date('2025-06-05'),
        assigneeId: null, // Unassigned
        creatorId: 'user-1', // John Doe
      },
    }),
    prisma.task.create({
      data: {
        id: 'task-15',
        title: 'Implement Dark Mode',
        description: 'Add dark mode support with proper theme switching and persistence. Ensure all components support both themes.',
        status: 'TODO',
        priority: 'LOW',
        dueDate: new Date('2025-06-20'),
        createdAt: new Date('2025-06-05'),
        updatedAt: new Date('2025-06-05'),
        assigneeId: 'user-4', // Alice Brown
        creatorId: 'user-2', // Jane Smith
      },
    }),
  ]);

  console.log(`✅ Created ${tasks.length} tasks`);

  // Create some task comments (if you have a comments model)
  // Uncomment this section if you have a TaskComment model
  /*
  const comments = await Promise.all([
    prisma.taskComment.create({
      data: {
        id: 'comment-1',
        content: 'Great progress on the UI design! The wireframes look fantastic.',
        taskId: 'task-1',
        authorId: 'user-1',
        createdAt: new Date('2025-06-03'),
        updatedAt: new Date('2025-06-03'),
      },
    }),
    prisma.taskComment.create({
      data: {
        id: 'comment-2',
        content: 'I\'ve completed the basic drag and drop functionality. Working on the visual feedback now.',
        taskId: 'task-4',
        authorId: 'user-2',
        createdAt: new Date('2025-06-05'),
        updatedAt: new Date('2025-06-05'),
      },
    }),
    prisma.taskComment.create({
      data: {
        id: 'comment-3',
        content: 'The MetaMask integration is working well. Need to add error handling for unsupported networks.',
        taskId: 'task-5',
        authorId: 'user-3',
        createdAt: new Date('2025-06-05'),
        updatedAt: new Date('2025-06-05'),
      },
    }),
  ]);

  console.log(`✅ Created ${comments.length} task comments`);
  */

  // Print summary
  console.log('\n📊 Seeding Summary:');
  console.log(`👥 Users: ${users.length}`);
  console.log(`📋 Tasks: ${tasks.length}`);
  console.log(`   • Done: ${tasks.filter(t => t.status === 'DONE').length}`);
  console.log(`   • In Progress: ${tasks.filter(t => t.status === 'IN_PROGRESS').length}`);
  console.log(`   • Todo: ${tasks.filter(t => t.status === 'TODO').length}`);
  console.log(`   • High Priority: ${tasks.filter(t => t.priority === 'HIGH').length}`);
  console.log(`   • Medium Priority: ${tasks.filter(t => t.priority === 'MEDIUM').length}`);
  console.log(`   • Low Priority: ${tasks.filter(t => t.priority === 'LOW').length}`);

  console.log('\n🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });