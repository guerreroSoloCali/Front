// services.js

const API_BASE_URL = 'http://localhost:8080/';

export async function getTasks() {
  try {
    const response = await fetch(API_BASE_URL + 'tasks');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


export async function registerTask(task) {
  try {
    const response = await fetch(API_BASE_URL + 'tasks/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


export async function deleteTask(task) {
  try {
    const response = await fetch(API_BASE_URL + 'tasks/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function changeTask(task) {
  try {
    const response = await fetch(API_BASE_URL + 'tasks/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}



