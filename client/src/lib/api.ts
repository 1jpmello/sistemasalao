const API_URL = import.meta.env.VITE_API_URL || "";

export async function fetchStaff(userId: string) {
  const response = await fetch(`${API_URL}/api/staff/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch staff");
  return response.json();
}

export async function fetchServices(userId: string) {
  const response = await fetch(`${API_URL}/api/services/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch services");
  return response.json();
}

export async function fetchAppointments(userId: string) {
  const response = await fetch(`${API_URL}/api/appointments/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch appointments");
  return response.json();
}

export async function fetchClients(userId: string) {
  const response = await fetch(`${API_URL}/api/clients/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch clients");
  return response.json();
}

export async function createAppointment(data: any) {
  const response = await fetch(`${API_URL}/api/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create appointment");
  return response.json();
}

export async function updateAppointment(id: string, data: any) {
  const response = await fetch(`${API_URL}/api/appointments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update appointment");
  return response.json();
}

export async function createStaff(data: any) {
  const response = await fetch(`${API_URL}/api/staff`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create staff");
  return response.json();
}

export async function deleteStaff(id: string) {
  const response = await fetch(`${API_URL}/api/staff/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete staff");
  return response.json();
}

export async function createService(data: any) {
  const response = await fetch(`${API_URL}/api/services`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create service");
  return response.json();
}

export async function deleteService(id: string) {
  const response = await fetch(`${API_URL}/api/services/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete service");
  return response.json();
}

export async function createClient(data: any) {
  const response = await fetch(`${API_URL}/api/clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create client");
  return response.json();
}

export async function fetchAutomations(userId: string) {
  const response = await fetch(`${API_URL}/api/automations/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch automations");
  return response.json();
}

export async function createAutomation(data: any) {
  const response = await fetch(`${API_URL}/api/automations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create automation");
  return response.json();
}

export async function updateAutomation(id: string, data: any) {
  const response = await fetch(`${API_URL}/api/automations/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update automation");
  return response.json();
}

export async function deleteAutomation(id: string) {
  const response = await fetch(`${API_URL}/api/automations/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete automation");
  return response.json();
}
