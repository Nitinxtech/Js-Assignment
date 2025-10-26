class EmployeeManager {
    constructor() {
        this.employees = this.loadEmployees();
    }
    loadEmployees() {
        const stored = localStorage.getItem("employees");
        if (stored)
            return JSON.parse(stored);
        const defaultEmployees = [
            { id: 1, name: "John Doe", position: "Software Engineer", email: "john@example.com" },
            { id: 2, name: "Jane Smith", position: "Project Manager", email: "jane@example.com" },
            { id: 3, name: "Mark Wilson", position: "Designer", email: "mark@example.com" }
        ];
        localStorage.setItem("employees", JSON.stringify(defaultEmployees));
        return defaultEmployees;
    }
    saveEmployees() {
        localStorage.setItem("employees", JSON.stringify(this.employees));
    }
    filterEmployees(query) {
        return this.employees.filter(e => e.name.toLowerCase().includes(query.toLowerCase()));
    }
    addEmployee(newEmp) {
        if (!newEmp.name.trim() || !newEmp.position.trim() || !newEmp.email.trim()) {
            throw new Error("Invalid employee data");
        }
        this.employees.push(newEmp);
        this.saveEmployees();
    }
    removeEmployee(id) {
        this.employees = this.employees.filter(e => e.id !== id);
        this.saveEmployees();
    }
}
const manager = new EmployeeManager();
