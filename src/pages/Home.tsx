
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, ShoppingCart, History } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to Hotel Oasis
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
              Experience fine dining from the comfort of your room
            </p>
            <p className="text-lg mb-12 text-primary-foreground/80">
              Browse our exquisite menu, customize your orders, and enjoy restaurant-quality meals delivered directly to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/menu">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                  Browse Menu
                </Button>
              </Link>
              <Link to="/orders">
                <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  View Orders
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Service?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enjoy the finest culinary experience with our convenient room service ordering system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Quick Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Fast and reliable delivery to your room within 30-45 minutes of placing your order.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Easy Ordering</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Browse our menu, customize your orders, and place them with just a few clicks.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <History className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Order Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track your order status in real-time and view your complete order history.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Dishes</h2>
            <p className="text-lg text-muted-foreground">
              Sample some of our most popular items
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop"
                  alt="Grilled Salmon"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Grilled Salmon</CardTitle>
                <p className="text-muted-foreground">
                  Atlantic salmon grilled to perfection with seasonal vegetables
                </p>
                <p className="text-xl font-bold text-primary">$24.99</p>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop"
                  alt="Beef Tenderloin"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Beef Tenderloin</CardTitle>
                <p className="text-muted-foreground">
                  Premium beef tenderloin with garlic mashed potatoes
                </p>
                <p className="text-xl font-bold text-primary">$32.99</p>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop"
                  alt="Chocolate Cake"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Chocolate Cake</CardTitle>
                <p className="text-muted-foreground">
                  Rich chocolate cake with vanilla ice cream
                </p>
                <p className="text-xl font-bold text-primary">$8.99</p>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center">
            <Link to="/menu">
              <Button size="lg">View Full Menu</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Order?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Start your culinary journey with us today
          </p>
          <Link to="/menu">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Order Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
