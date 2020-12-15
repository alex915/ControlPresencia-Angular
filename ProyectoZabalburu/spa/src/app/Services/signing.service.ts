import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Employee } from "../models/employee";
import { Signing } from "../models/signing";
import { Client } from "../models/client";
import { Center } from "../models/center";
import { environment } from "../../environments/environment";
import { AuthenticationService } from "./auth.service";
import { EmployeesViewComponent } from '../modules/employees-view/employees-view.component';

@Injectable({
  providedIn: "root",
})
export class SigningService {
  public user: Employee;
  public client: Client;
  public center: Center;
    private api: string = environment.baseUrl;
    public empview: EmployeesViewComponent;

  constructor(
    private http: HttpClient,
    public service: AuthenticationService
  ) {}

  //Employees

  public async getUser(oid: string): Promise<any> {
    return await this.http.get(`${this.api}/employees/oid/${oid}`).toPromise();
  }

    public async getEmployee(id: number): Promise<any> {
    return await this.http.get(`${this.api}/employees/${id}`).toPromise();
  }

  public async postEmployees(employee: Employee): Promise<any> {
    return await this.http.post(`${this.api}/employees/user`, employee).toPromise();
  }

  public async postEmployeesAdmin(employee: Employee): Promise<any> {
    return await this.http.post(`${this.api}/employees/admin`, employee).toPromise();
  }

  public async putEmployees(id: number, employee: Employee): Promise<any> {
    return await this.http.put(`${this.api}/employees/${id}`, employee).toPromise();
  }

  public async putEmployeesAdmin(id: number, employee: Employee): Promise<any> {
    return await this.http.post(`${this.api}/employees/admin/${id}`, employee).toPromise();
  }
  public async deleteEmployee(id: number): Promise<any> {
    return await this.http.delete(`${this.api}/employees/${id}`).toPromise();
  }

  public async getAllEmployees(): Promise<any> {
    return await this.http.get(`${this.api}/employees`).toPromise();
  }

  //Signings

    public async postSignings(signing: Signing): Promise<any> {
    return await this.http.post(`${this.api}/signings`, signing).toPromise();
  }

    public async deleteSignings(id: number): Promise<any> {
        
       // this.user.fichajes.find(id)
      return await this.http.delete(`${this.api}/signings/${id}`).toPromise();
     
  }

  public async getAllSignings(): Promise<any> {
    return await this.http.get(`${this.api}/signings`).toPromise();
  }

  //Centers

  public async getCenter(id: number): Promise<any> {
    return await this.http.get(`${this.api}/centers/${id}`).toPromise();
  }

    public async postCenters(center: Center): Promise<any> {
       // this.client.centros.unshift(center);

        return await this.http.post(`${this.api}/centers`, center).toPromise();
  }

  public async putCenters(id: number, center: Center): Promise<any> {
    return await this.http.put(`${this.api}/centers/${id}`, center).toPromise();
  }

  public async deleteCenters(id: number): Promise<any> {
    return await this.http.delete(`${this.api}/centers/${id}`).toPromise();
  }

  public async getAllCenters(): Promise<any> {
    return await this.http.get(`${this.api}/centers`).toPromise();
  }

  //Clients

  public async getAllClients(): Promise<any> {
    return await this.http.get(`${this.api}/clients`).toPromise();
  }

  public async getClient(id: number): Promise<any> {
    return await this.http.get(`${this.api}/clients/${id}`).toPromise();
  }

    public async postClients(client: Client): Promise<any> {
        
    return await this.http.post(`${this.api}/clients`, client).toPromise();
  }

  public async putClients(id: number, client: Client): Promise<any> {
    return await this.http.put(`${this.api}/clients/${id}`, client).toPromise();
  }

  public async deleteClients(id: number): Promise<any> {
    return await this.http.delete(`${this.api}/clients/${id}`).toPromise();
  }

  //Devices

    public async getDevice(id: number): Promise<any> {
        
    return await this.http.get(`${this.api}/devices/${id}`).toPromise();
  }

  public async deleteDevice(id: number): Promise<any> {
    return await this.http.delete(`${this.api}/devices/${id}`).toPromise();
  }

  public async getAllDevices(): Promise<any> {
    return await this.http.get(`${this.api}/devices`).toPromise();
  }

  //Others (Search, filter...)

  public async searchElement(
    type: number,
    search: string,
    startDate?: Date,
    endDate?: Date,
    sType?: string
  ) {
    switch (type) {
      case 0: //clients
        return await this.http
          .get(`${this.api}/clients?q=${search}`).toPromise();
      case 1: //centers
        return await this.http
          .get(`${this.api}/centers?q=${search}`).toPromise();
      case 2: //devices
        return await this.http
          .get(`${this.api}/devices?q=${search}`).toPromise();
      case 3: //employees
        return await this.http
          .get(`${this.api}/employees?q=${search}`).toPromise();
      case 4: //signing date
        return await this.http
          .get(`${this.api}/signings?startDate=${startDate}&endDate=${endDate}`).toPromise();
      case 5: //signing type
        return await this.http
          .get(`${this.api}/signings?tipo=${sType}`).toPromise();
    }
  }

  public async filterDates(startDate?: Date, endDate?: Date) {
    return await this.http
      .get(`${this.api}/signings?startDate=${startDate}&endDate=${endDate}`).toPromise();
  }

  public async filterType(type?: string) {
    return await this.http.get(`${this.api}/signings?tipo=${type}`).toPromise();
  }

  //DATA
  public async totalMonthEmployee(numb: number) {
    return await this.http.get(`${this.api}/data/employee/total/${numb}`).toPromise();
  }
  public async totalMonthCenter(numb: number) {
    return await this.http.get(`${this.api}/data/center/total/${numb}`).toPromise();
  }
  
  public async totalYearEmployee(numb: number) {
    return await this.http.get(`${this.api}/data/employee/media/${numb}`).toPromise();
  }

  public async totalDay(numb: number) {
    return await this.http.get(`${this.api}/data/center/totalday/${numb}`).toPromise();
  }

}
