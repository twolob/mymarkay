
import { useState } from "react";
import { Mail, Phone, MapPin, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminContacts = () => {
  const [selectedContact, setSelectedContact] = useState<any>(null);

  // Mock contact data
  const contacts = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+231-555-0123",
      subject: "Product Inquiry",
      message: "I'm interested in learning more about your smartphone collection.",
      date: "2024-01-15",
      status: "Unread"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+231-555-0456",
      subject: "Technical Support",
      message: "I need help with my recent purchase.",
      date: "2024-01-14",
      status: "Read"
    },
    {
      id: 3,
      name: "Bob Wilson",
      email: "bob@example.com",
      phone: "+231-555-0789",
      subject: "General Question",
      message: "What are your business hours?",
      date: "2024-01-13",
      status: "Replied"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-markay-black">Contact Management</h2>
        <p className="text-gray-600">View and manage customer inquiries</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-markay-black">Contact Messages</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Contact</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow 
                      key={contact.id}
                      className={contact.status === 'Unread' ? 'bg-blue-50' : ''}
                    >
                      <TableCell>
                        <div>
                          <div className="font-medium text-markay-black">{contact.name}</div>
                          <div className="text-sm text-gray-600">{contact.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{contact.subject}</TableCell>
                      <TableCell className="text-gray-600">{contact.date}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          contact.status === 'Unread' 
                            ? 'bg-blue-100 text-blue-800'
                            : contact.status === 'Read'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {contact.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedContact(contact)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Contact Details */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-markay-black">Message Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedContact ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-markay-black">{selectedContact.name}</h4>
                    <p className="text-sm text-gray-600">{selectedContact.subject}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{selectedContact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{selectedContact.phone}</span>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-markay-black mb-2">Message:</h5>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {selectedContact.message}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full bg-markay-yellow text-markay-black hover:bg-yellow-400">
                      Reply
                    </Button>
                    <Button variant="outline" className="w-full">
                      Mark as Read
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Select a message to view details
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminContacts;
