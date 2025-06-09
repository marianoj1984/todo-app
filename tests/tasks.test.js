const request = require('supertest');
const app = require('../src/app');

let createdTaskId; // guardará el ID para pruebas de PUT y DELETE

describe('API /tasks', () => {
  it('GET /tasks → debe responder con un array', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /tasks → debe crear una nueva tarea', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Nueva tarea de prueba' });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Nueva tarea de prueba');

    createdTaskId = res.body.id; // guardamos el ID
  });

  it('PUT /tasks/:id → debe actualizar una tarea existente', async () => {
    const res = await request(app)
      .put(`/tasks/${createdTaskId}`)
      .send({ title: 'Tarea actualizada' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Tarea actualizada');
  });

  it('DELETE /tasks/:id → debe eliminar la tarea', async () => {
    const res = await request(app).delete(`/tasks/${createdTaskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Tarea eliminada');
  });
});
