import React from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "../../components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";

// Dummy data for labs
const labsData = [
  { id: 1, name: "Lab A", location: "Building 1, Floor 2", capacity: 30, status: "Available" },
  { id: 2, name: "Lab B", location: "Building 2, Floor 1", capacity: 25, status: "In Use" },
  { id: 3, name: "Lab C", location: "Building 1, Floor 3", capacity: 40, status: "Under Maintenance" },
  { id: 4, name: "Lab D", location: "Building 3, Floor 1", capacity: 20, status: "Available" },
  { id: 5, name: "Lab E", location: "Building 2, Floor 2", capacity: 35, status: "Available" },
];

const LabManagement = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Lab Management</h1>
        <Button>Add New Lab</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Labs</CardTitle>
            <CardDescription>All registered labs</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{labsData.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Available</CardTitle>
            <CardDescription>Labs available for use</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{labsData.filter(lab => lab.status === "Available").length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>In Use / Maintenance</CardTitle>
            <CardDescription>Labs currently unavailable</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{labsData.filter(lab => lab.status !== "Available").length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lab List</CardTitle>
          <CardDescription>Manage your laboratory facilities</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {labsData.map((lab) => (
                <TableRow key={lab.id}>
                  <TableCell>{lab.id}</TableCell>
                  <TableCell>{lab.name}</TableCell>
                  <TableCell>{lab.location}</TableCell>
                  <TableCell>{lab.capacity}</TableCell>
                  <TableCell>
                    <span 
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        lab.status === "Available" 
                          ? "bg-green-100 text-green-800" 
                          : lab.status === "In Use" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {lab.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="destructive" size="sm">Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LabManagement;