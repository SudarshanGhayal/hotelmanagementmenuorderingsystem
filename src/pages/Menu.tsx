
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  available: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const Menu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { toast } = useToast();

  const categories = ['All', 'Appetizers', 'Main Course', 'Desserts', 'Beverages'];

  // Sample menu data
  useEffect(() => {
    const sampleMenu: MenuItem[] = [
      {
        id: '1',
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with Caesar dressing, parmesan cheese, and croutons',
        price: 12.99,
        imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
        category: 'Appetizers',
        available: true
      },
      {
        id: '2',
        name: 'Grilled Salmon',
        description: 'Atlantic salmon grilled to perfection with seasonal vegetables',
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
      },
      {
        id: '4',
        name: 'Fresh Orange Juice',
        description: 'Freshly squeezed orange juice',
        price: 4.99,
        imageUrl: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop',
        category: 'Beverages',
        available: true
      },
      {
        id: '5',
        name: 'Beef Tenderloin',
        description: 'Premium beef tenderloin with garlic mashed potatoes',
        price: 32.99,
        imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
        category: 'Main Course',
        available: true
      },
      {
        id: '6',
        name: 'Bruschetta',
        description: 'Toasted bread with fresh tomatoes, basil, and mozzarella',
        price: 9.99,
        imageUrl: 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=400&h=300&fit=crop',
        category: 'Appetizers',
        available: true
      }
    ];
    setMenuItems(sampleMenu);
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('hotelCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    let newCart;
    
    if (existingItem) {
      newCart = cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      newCart = [...cart, { ...item, quantity: 1 }];
    }
    
    setCart(newCart);
    localStorage.setItem('hotelCart', JSON.stringify(newCart));
    
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const updateQuantity = (itemId: string, change: number) => {
    const newCart = cart.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(0, item.quantity + change);
        return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean) as CartItem[];
    
    setCart(newCart);
    localStorage.setItem('hotelCart', JSON.stringify(newCart));
  };

  const getItemQuantity = (itemId: string) => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Hotel Oasis</h1>
              <p className="text-primary-foreground/80">Fine Dining Experience</p>
            </div>
            <Link to="/cart" className="relative">
              <Button variant="secondary" size="lg" className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Cart ({getTotalItems()})
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-secondary">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="flex-shrink-0"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Menu Items */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => {
            const quantity = getItemQuantity(item.id);
            return (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                  {item.available && (
                    <div className="flex items-center justify-between">
                      {quantity === 0 ? (
                        <Button 
                          onClick={() => addToCart(item)}
                          className="w-full"
                        >
                          Add to Cart
                        </Button>
                      ) : (
                        <div className="flex items-center gap-3 w-full">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="flex-1 text-center font-semibold">
                            {quantity} in cart
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No items found in this category.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Menu;
