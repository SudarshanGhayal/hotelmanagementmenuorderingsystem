
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LogOut, Plus, Edit, Trash2, Package, ShoppingCart, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  available: boolean;
}

interface Order {
  id: string;
  customerInfo: {
    name: string;
    phone: string;
    email: string;
    roomNumber: string;
  };
  items: any[];
  total: number;
  status: string;
  orderDate: string;
}

const AdminDashboard = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'menu' | 'orders'>('overview');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin/login');
      return;
    }

    // Load menu items
    const sampleMenu: MenuItem[] = [
      {
        id: '1',
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with Caesar dressing',
        price: 12.99,
        imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
        category: 'Appetizers',
        available: true
      },
      {
        id: '2',
        name: 'Grilled Salmon',
        description: 'Atlantic salmon grilled to perfection',
        price: 24.99,
        imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
        category: 'Main Course',
        available: true
      },
      {
        id: '3',
        name: 'Chocolate Cake',
        description: 'Rich chocolate cake with vanilla ice cream',
        price: 8.99,
        imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
        category: 'Desserts',
        available: true
      }
    ];
    setMenuItems(sampleMenu);

    // Load orders
    const savedOrders = localStorage.getItem('hotelOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('hotelOrders', JSON.stringify(updatedOrders));
  };

  const toggleMenuItemAvailability = (itemId: string) => {
    const updatedItems = menuItems.map(item =>
      item.id === itemId ? { ...item, available: !item.available } : item
    );
    setMenuItems(updatedItems);
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
    switch (status) {
      case 'Pending': return 'secondary';
      case 'Preparing': return 'default';
      case 'Ready': return 'default';
      case 'Delivered': return 'default';
      case 'Cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-primary-foreground/80">Hotel Sudarshan Management</p>
            </div>
            <div className="flex items-center gap-4">
              <span>Welcome, {user?.username}</span>
              <Button variant="secondary" onClick={handleLogout} className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-secondary">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-2">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'menu', label: 'Menu Management' },
              { key: 'orders', label: 'Orders' }
            ].map(tab => (
              <Button
                key={tab.key}
                variant={activeTab === tab.key ? "default" : "outline"}
                onClick={() => setActiveTab(tab.key as any)}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{orders.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Menu Items</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{menuItems.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'menu' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Menu Management</h2>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New Item
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map(item => (
                <Card key={item.id}>
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <Badge variant={item.available ? "default" : "secondary"}>
                        {item.available ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                    <p className="text-xl font-bold text-primary">${item.price}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Edit className="w-3 h-3" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleMenuItemAvailability(item.id)}
                      >
                        {item.available ? 'Disable' : 'Enable'}
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1 text-destructive">
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Order Management</h2>
            {orders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground">No orders found.</p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map(order => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">#{order.id}</TableCell>
                        <TableCell>{order.customerInfo.name}</TableCell>
                        <TableCell>{order.customerInfo.roomNumber}</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(order.orderDate)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {order.status === 'Pending' && (
                              <Button
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, 'Preparing')}
                              >
                                Start
                              </Button>
                            )}
                            {order.status === 'Preparing' && (
                              <Button
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, 'Ready')}
                              >
                                Ready
                              </Button>
                            )}
                            {order.status === 'Ready' && (
                              <Button
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, 'Delivered')}
                              >
                                Deliver
                              </Button>
                            )}
                            {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updateOrderStatus(order.id, 'Cancelled')}
                              >
                                Cancel
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
