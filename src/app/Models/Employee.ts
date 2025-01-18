export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: number | null;
  dob: Date | null;
  age: string | null;
  salary: number | null;
  address?: string;
  imageUrl?: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    contactNumber: any,
    dob: any,
    age: any,
    salary: any,
    address?: string,
    imageUrl?: string
  ) {
    this.id = id || 0; // Si l'ID est absent ou invalide, définir 0
    this.firstName = this.validateString(firstName);
    this.lastName = this.validateString(lastName);
    this.email = this.validateString(email);
    this.contactNumber = this.validateNumber(contactNumber);
    this.dob = this.validateDate(dob);
    this.age = this.validateString(age); // L'âge reste une chaîne dans votre modèle
    this.salary = this.validateNumber(salary);
    this.address = this.validateString(address);
    this.imageUrl = this.validateString(imageUrl);
  }

  // Méthode pour valider une chaîne
  private validateString(value: any): string {
    return typeof value === 'string' && value.trim() !== '' ? value : 'null';
  }

  // Méthode pour valider un nombre
  private validateNumber(value: any): number | null {
    return !isNaN(Number(value)) ? Number(value) : null;
  }

  /// Méthode pour valider une date
private validateDate(value: any): Date | null {
  return isNaN(Date.parse(value)) ? null : new Date(value);
}

}
