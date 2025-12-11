export async function fetchStaff(userId: string) {
  const response = await fetch(`/api/staff/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch staff");
  return response.json();
}

export async function fetchServices(userId: string) {
  const response = await fetch(`/api/services/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch services");
  return response.json();
}

export async function fetchAppointments(userId: string) {
  const response = await fetch(`/api/appointments/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch appointments");
  return response.json();
}

export async function fetchClients(userId: string) {
  const response = await fetch(`/api/clients/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch clients");
  return response.json();
}

export async function createAppointment(data: any) {
  const response = await fetch("/api/appointments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create appointment");
  return response.json();
}

export async function updateAppointment(id: string, data: any) {
  const response = await fetch(`/api/appointments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update appointment");
  return response.json();
}

export async function createStaff(data: any) {
  const response = await fetch("/api/staff", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create staff");
  return response.json();
}

export async function deleteStaff(id: string) {
  const response = await fetch(`/api/staff/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete staff");
  return response.json();
}

export async function createService(data: any) {
  const response = await fetch("/api/services", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create service");
  return response.json();
}

export async function deleteService(id: string) {
  const response = await fetch(`/api/services/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete service");
  return response.json();
}

export async function createClient(data: any) {
  const response = await fetch("/api/clients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create client");
  return response.json();
}
