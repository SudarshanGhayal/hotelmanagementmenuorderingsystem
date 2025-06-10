
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, CheckCircle, XCircle } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  customerInfo: {
    name: string;
    phone: string;
    email: string;
    roomNumber: string;
    specialInstructions: string;
  };
  items: OrderItem[];
  subtotal: number;
  tax: number;
  serviceCharge: number;
  total: number;
  status: 'Pending' | 'Preparing' | 'Ready' | 'Delivered' | 'Cancelled';
  orderDate: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('hotelOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Clock className="w-4 h-4" />;
      case 'Preparing':
        return <Clock className="w-4 h-4" />;
      case 'Ready':
        return <CheckCircle className="w-4 h-4" />;
      case 'Delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'Cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
    switch (status) {
      case 'Pending':
        return 'secondary';
      case 'Preparing':
        return 'default';
      case 'Ready':
        return 'default';
      case 'Delivered':
        return 'default';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link to="/menu">
              <Button variant="secondary" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Order History</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-semibold mb-4">No orders yet</h2>
              <p className="text-muted-foreground mb-6">
                You haven't placed any orders yet. Start by browsing our menu!
              </p>
              <Link to="/menu">
                <Button size="lg">Browse Menu</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Your Orders</h2>
              <p className="text-muted-foreground">{orders.length} order(s) found</p>
            </div>

            <div className="space-y-4">
              {orders.map(order => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="bg-secondary/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          Order #{order.id}
                          <Badge variant={getStatusVariant(order.status)} className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {order.status}
                          </Badge>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Placed on {formatDate(order.orderDate)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">
                          Room {order.customerInfo.roomNumber}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Order Items */}
                      <div>
                        <h4 className="font-semibold mb-3">Items Ordered</h4>
                        <div className="space-y-2">
                          {order.items.map(item => (
                            <div key={item.id} className="flex justify-between items-center">
                              <div>
                                <span className="font-medium">{item.name}</span>
                                <span className="text-muted-foreground"> x{item.quantity}</span>
                              </div>
                              <span className="font-semibold">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        {order.customerInfo.specialInstructions && (
                          <div className="mt-4 p-3 bg-secondary/30 rounded-md">
                            <h5 className="font-medium text-sm mb-1">Special Instructions:</h5>
                            <p className="text-sm text-muted-foreground">
                              {order.customerInfo.specialInstructions}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Order Summary */}
                      <div>
                        <h4 className="font-semibold mb-3">Order Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${order.subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax</span>
                            <span>${order.tax.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Service Charge</span>
                            <span>${order.serviceCharge.toFixed(2)}</span>
                          </div>
                          <div className="border-t pt-2 flex justify-between font-semibold">
                            <span>Total</span>
                            <span>${order.total.toFixed(2)}</span>
                          </div>
                        </div>

                        <div className="mt-4 p-3 bg-secondary/30 rounded-md">
                          <h5 className="font-medium text-sm mb-1">Customer Info:</h5>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>{order.customerInfo.name}</p>
                            <p>{order.customerInfo.phone}</p>
                            {order.customerInfo.email && <p>{order.customerInfo.email}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Orders;
