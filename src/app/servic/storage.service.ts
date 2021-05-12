import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

export interface Profile{
  id: number,
  name: string,
  surname: string,
  age: number,
  height: number,
  weight: number
}

export interface Appointment{
  id: number,
  title: string,
  description: string,
  place: string,
  date: string,
  time: string,
  profile: string
}

const PROFILES_KEY = "my-profiles"
const APPOINTMENTS_KEY = "my-appointments"


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  async addProfile(item: Profile): Promise<any>{
  const items = await this.storage.get(PROFILES_KEY);
  if (items) {
    items.push(item);
    return this.storage.set(PROFILES_KEY, items);
  } else {
    return this.storage.set(PROFILES_KEY, [item]);
  }
}

getProfiles(): Promise<Profile[]>{
  return this.storage.get(PROFILES_KEY);
}

  async updateProfile(item: Profile): Promise<any>{
  const items = await this.storage.get(PROFILES_KEY);
  if (!items || items.length === 0) {
    return null;
  }
  let newProfiles: Profile[] = [];
  for (let i of items) {
    if (i.id === item.id) {
      newProfiles.push(item);
    } else {
      newProfiles.push(i);
    }
  }
  return await this.storage.set(PROFILES_KEY, newProfiles);
}

  async deleteProfile(id: number): Promise<Profile> {
  const items = await this.storage.get(PROFILES_KEY);
  if (!items || items.length === 0) {
    return null;
  }
  let toKeep: Profile[] = [];
  for (let i of items) {
    if (i.id !== id) {
      toKeep.push(i);
    }
  }
  return await this.storage.set(PROFILES_KEY, toKeep);
}

  async addAppointment(item: Appointment): Promise<any>{
  const items = await this.storage.get(APPOINTMENTS_KEY);
  if (items) {
    items.push(item);
    return this.storage.set(APPOINTMENTS_KEY, items);
  } else {
    return this.storage.set(APPOINTMENTS_KEY, [item]);
  }
}

getAppointments(): Promise<Appointment[]>{
  return this.storage.get(APPOINTMENTS_KEY);
}

  async updateAppointment(item: Appointment): Promise<any>{
  const items = await this.storage.get(APPOINTMENTS_KEY);
  if (!items || items.length === 0) {
    return null;
  }
  let newAppointments: Appointment[] = [];
  for (let i of items) {
    if (i.id === item.id) {
      newAppointments.push(item);
    } else {
      newAppointments.push(i);
    }
  }
  return await this.storage.set(APPOINTMENTS_KEY, newAppointments);
}

  async deleteAppointment(id: number): Promise<Appointment> {
  const items = await this.storage.get(APPOINTMENTS_KEY);
  if (!items || items.length === 0) {
    return null;
  }
  let toKeep: Appointment[] = [];
  for (let i of items) {
    if (i.id !== id) {
      toKeep.push(i);
    }
  }
  return await this.storage.set(APPOINTMENTS_KEY, toKeep);
}

}
