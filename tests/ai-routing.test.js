const aiClient = require('../src/services/ai/aiClient');

async function test() {
  const cases = [
    { task: 'diagnose', msg: 'engine misfire' },
    { task: 'estimate', msg: 'brake replacement' },
    { task: 'translate', msg: 'car shakes when braking' }
  ];

  for (const c of cases) {
    const res = await aiClient.run({
      task: c.task,
      messages: [{ role: 'user', content: c.msg }]
    });

    console.log('TASK:', c.task);
    console.log('OK:', !!res);
    console.log('---');
  }
}

test().catch(console.error);
