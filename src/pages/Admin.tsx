
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus, Upload, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  colors: string[];
  sizes: string[];
  stock: number;
  image: string;
}

interface GalleryImage {
  id: number;
  name: string;
  url: string;
  type: "hero" | "studio" | "gallery";
}

const Admin = () => {
  const { toast } = useToast();
  
  // Load initial data from localStorage or use defaults
  const loadProducts = (): Product[] => {
    const stored = localStorage.getItem('admin-products');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error loading products from localStorage:', e);
      }
    }
    return [
      { 
        id: 1, 
        name: "Classic Blazer", 
        price: 299, 
        category: "Outerwear", 
        description: "A timeless classic blazer crafted from premium wool blend. Perfect for both formal occasions and smart-casual styling. Features a tailored fit with natural shoulder construction and functional buttonholes.",
        colors: ["Navy", "Charcoal", "Black"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        stock: 15,
        image: `${import.meta.env.BASE_URL}uploads/fabb82a8-d5e3-4208-878b-90ee1150e514.png`
      },
      { 
        id: 2, 
        name: "Premium Shirt", 
        price: 129, 
        category: "Shirts", 
        description: "Luxuriously soft cotton shirt with impeccable tailoring. Features mother-of-pearl buttons and French seams for durability and elegance.",
        colors: ["White", "Light Blue", "Navy"],
        sizes: ["S", "M", "L", "XL"],
        stock: 23,
        image: `${import.meta.env.BASE_URL}uploads/2c3ec1f0-b898-4836-98b4-50ae23f083e7.png`
      },
      { 
        id: 3, 
        name: "Tailored Trousers", 
        price: 189, 
        category: "Bottoms", 
        description: "Perfectly tailored trousers for the modern gentleman",
        colors: ["Black", "Charcoal", "Navy"],
        sizes: ["30", "32", "34", "36", "38"],
        stock: 18,
        image: `${import.meta.env.BASE_URL}uploads/0e6f0cb5-91c2-49d9-84d6-43e3742b70fe.png`
      },
      { 
        id: 4, 
        name: "Designer Suit", 
        price: 599, 
        category: "Suits", 
        description: "Premium designer suit with exceptional tailoring",
        colors: ["Navy", "Charcoal", "Black"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        stock: 8,
        image: `${import.meta.env.BASE_URL}uploads/155e1b16-a705-459e-94e9-c7747213138d.png`
      },
      { 
        id: 5, 
        name: "Casual Jacket", 
        price: 249, 
        category: "Outerwear", 
        description: "Stylish casual jacket for everyday wear",
        colors: ["Navy", "Gray", "Black"],
        sizes: ["S", "M", "L", "XL"],
        stock: 12,
        image: `${import.meta.env.BASE_URL}uploads/2c97c5bf-a49d-45cb-896e-e53ee41bcd61.png`
      },
      { 
        id: 6, 
        name: "Dress Shirt", 
        price: 159, 
        category: "Shirts", 
        description: "Elegant dress shirt for formal occasions",
        colors: ["White", "Light Blue", "Pink"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        stock: 20,
        image: `${import.meta.env.BASE_URL}uploads/55070205-e7ce-4130-a3b3-97cba7bf70e2.png`
      },
    ];
  };

  const loadGalleryImages = (): GalleryImage[] => {
    const stored = localStorage.getItem('admin-gallery');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error loading gallery from localStorage:', e);
      }
    }
    return [
      { id: 1, name: "Hero Image", url: `${import.meta.env.BASE_URL}uploads/7a496881-829d-446b-91e5-9f4b65153623.png`, type: "hero" },
      { id: 2, name: "Studio Image", url: `${import.meta.env.BASE_URL}uploads/20250403_164355_IMG_2270.jpg`, type: "studio" },
      { id: 3, name: "Gallery 1", url: `${import.meta.env.BASE_URL}uploads/fabb82a8-d5e3-4208-878b-90ee1150e514.png`, type: "gallery" },
      { id: 4, name: "Gallery 2", url: `${import.meta.env.BASE_URL}uploads/2c3ec1f0-b898-4836-98b4-50ae23f083e7.png`, type: "gallery" },
      { id: 5, name: "Gallery 3", url: `${import.meta.env.BASE_URL}uploads/0e6f0cb5-91c2-49d9-84d6-43e3742b70fe.png`, type: "gallery" },
    ];
  };

  const [products, setProducts] = useState<Product[]>(loadProducts);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(loadGalleryImages);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    colors: "",
    sizes: "",
    stock: "",
    image: ""
  });

  // Save to localStorage whenever products change
  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem('admin-products', JSON.stringify(updatedProducts));
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  // Save to localStorage whenever gallery changes
  const saveGallery = (updatedGallery: GalleryImage[]) => {
    setGalleryImages(updatedGallery);
    localStorage.setItem('admin-gallery', JSON.stringify(updatedGallery));
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.stock) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const product: Product = {
      id: Math.max(...products.map(p => p.id), 0) + 1,
      name: newProduct.name,
      price: parseInt(newProduct.price),
      category: newProduct.category,
      description: newProduct.description,
      colors: newProduct.colors.split(',').map(c => c.trim()).filter(c => c),
      sizes: newProduct.sizes.split(',').map(s => s.trim()).filter(s => s),
      stock: parseInt(newProduct.stock),
      image: newProduct.image || "/uploads/fabb82a8-d5e3-4208-878b-90ee1150e514.png"
    };

    const updatedProducts = [...products, product];
    saveProducts(updatedProducts);
    
    setNewProduct({ name: "", price: "", category: "", description: "", colors: "", sizes: "", stock: "", image: "" });
    
    toast({
      title: "Success",
      description: "Product added successfully",
    });
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingProduct) return;

    const updatedProducts = products.map(p => 
      p.id === editingProduct.id ? editingProduct : p
    );
    
    saveProducts(updatedProducts);
    setEditingProduct(null);
    
    toast({
      title: "Success",
      description: "Product updated successfully",
    });
  };

  const handleDeleteProduct = (id: number) => {
    const updatedProducts = products.filter(p => p.id !== id);
    saveProducts(updatedProducts);
    
    toast({
      title: "Success",
      description: "Product deleted successfully",
    });
  };

  const handleDeleteImage = (id: number) => {
    const imageToDelete = galleryImages.find(img => img.id === id);
    
    // Prevent deletion of hero and studio images
    if (imageToDelete && (imageToDelete.type === "hero" || imageToDelete.type === "studio")) {
      toast({
        title: "Error",
        description: "Hero and Studio images cannot be deleted, only replaced",
        variant: "destructive"
      });
      return;
    }
    
    const updatedGallery = galleryImages.filter(img => img.id !== id);
    saveGallery(updatedGallery);
    
    toast({
      title: "Success",
      description: "Image deleted successfully",
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, imageId?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real app, you'd upload to a server. For demo, we'll use a placeholder
    const newUrl = URL.createObjectURL(file);
    
    if (imageId) {
      // Replace existing image
      const updatedGallery = galleryImages.map(img => 
        img.id === imageId ? { ...img, url: newUrl } : img
      );
      saveGallery(updatedGallery);
    } else {
      // Add new image
      const newImage: GalleryImage = {
        id: Math.max(...galleryImages.map(img => img.id), 0) + 1,
        name: file.name,
        url: newUrl,
        type: "gallery"
      };
      saveGallery([...galleryImages, newImage]);
    }
    
    toast({
      title: "Success",
      description: "Image uploaded successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-playfair mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your products, images, and store content</p>
          </div>

          <Tabs defaultValue="products" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Add/Edit Product Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>{editingProduct ? "Edit Product" : "Add New Product"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-4">
                      <Input
                        placeholder="Product Name *"
                        value={editingProduct ? editingProduct.name : newProduct.name}
                        onChange={(e) => editingProduct 
                          ? setEditingProduct({...editingProduct, name: e.target.value})
                          : setNewProduct({...newProduct, name: e.target.value})
                        }
                        required
                      />
                      <Input
                        type="number"
                        placeholder="Price *"
                        value={editingProduct ? editingProduct.price : newProduct.price}
                        onChange={(e) => editingProduct 
                          ? setEditingProduct({...editingProduct, price: parseInt(e.target.value) || 0})
                          : setNewProduct({...newProduct, price: e.target.value})
                        }
                        required
                      />
                      <Input
                        placeholder="Category *"
                        value={editingProduct ? editingProduct.category : newProduct.category}
                        onChange={(e) => editingProduct 
                          ? setEditingProduct({...editingProduct, category: e.target.value})
                          : setNewProduct({...newProduct, category: e.target.value})
                        }
                        required
                      />
                      <Textarea
                        placeholder="Description"
                        value={editingProduct ? editingProduct.description : newProduct.description}
                        onChange={(e) => editingProduct 
                          ? setEditingProduct({...editingProduct, description: e.target.value})
                          : setNewProduct({...newProduct, description: e.target.value})
                        }
                      />
                      <Input
                        placeholder="Colors (comma separated)"
                        value={editingProduct ? editingProduct.colors.join(', ') : newProduct.colors}
                        onChange={(e) => editingProduct 
                          ? setEditingProduct({...editingProduct, colors: e.target.value.split(',').map(c => c.trim())})
                          : setNewProduct({...newProduct, colors: e.target.value})
                        }
                      />
                      <Input
                        placeholder="Sizes (comma separated)"
                        value={editingProduct ? editingProduct.sizes.join(', ') : newProduct.sizes}
                        onChange={(e) => editingProduct 
                          ? setEditingProduct({...editingProduct, sizes: e.target.value.split(',').map(s => s.trim())})
                          : setNewProduct({...newProduct, sizes: e.target.value})
                        }
                      />
                      <Input
                        type="number"
                        placeholder="Stock Quantity *"
                        value={editingProduct ? editingProduct.stock : newProduct.stock}
                        onChange={(e) => editingProduct 
                          ? setEditingProduct({...editingProduct, stock: parseInt(e.target.value) || 0})
                          : setNewProduct({...newProduct, stock: e.target.value})
                        }
                        required
                      />
                      <Input
                        placeholder="Image URL"
                        value={editingProduct ? editingProduct.image : newProduct.image}
                        onChange={(e) => editingProduct 
                          ? setEditingProduct({...editingProduct, image: e.target.value})
                          : setNewProduct({...newProduct, image: e.target.value})
                        }
                      />
                      <div className="flex gap-2">
                        <Button type="submit" className="flex-1">
                          <Plus className="mr-2" size={16} />
                          {editingProduct ? "Update Product" : "Add Product"}
                        </Button>
                        {editingProduct && (
                          <Button type="button" variant="outline" onClick={() => setEditingProduct(null)}>
                            Cancel
                          </Button>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>

                {/* Products Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Current Products ({products.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="max-h-96 overflow-y-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {products.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="w-12 h-12 object-cover rounded"
                                  />
                                  <div>
                                    <div className="font-medium">{product.name}</div>
                                    <Badge variant="outline">{product.category}</Badge>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>${product.price}</TableCell>
                              <TableCell>{product.stock}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Link to={`/product/${product.id}`}>
                                    <Button variant="outline" size="sm">
                                      <ExternalLink size={16} />
                                    </Button>
                                  </Link>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setEditingProduct(product)}
                                  >
                                    <Pencil size={16} />
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleDeleteProduct(product.id)}
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="images" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e)}
                      className="mb-2"
                    />
                    <p className="text-sm text-gray-500">Upload new image to gallery</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.map((image) => (
                      <div key={image.id} className="border rounded-lg p-4">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <div className="space-y-2">
                          <h3 className="font-medium">{image.name}</h3>
                          <Badge variant="outline">{image.type}</Badge>
                          <div className="flex gap-2">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, image.id)}
                              className="hidden"
                              id={`upload-${image.id}`}
                            />
                            <label htmlFor={`upload-${image.id}`}>
                              <Button variant="outline" size="sm" className="flex-1 cursor-pointer" asChild>
                                <span>
                                  <Upload size={16} className="mr-2" />
                                  Replace
                                </span>
                              </Button>
                            </label>
                            {image.type === "gallery" && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteImage(image.id)}
                              >
                                <Trash2 size={16} />
                              </Button>
                            )}
                            {(image.type === "hero" || image.type === "studio") && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                disabled
                                title="Hero and Studio images cannot be deleted"
                              >
                                <Trash2 size={16} />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{products.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Total Stock</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {products.reduce((acc, p) => acc + p.stock, 0)}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {new Set(products.map(p => p.category)).size}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Avg. Price</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      ${products.length > 0 ? Math.round(products.reduce((acc, p) => acc + p.price, 0) / products.length) : 0}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Product Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Array.from(new Set(products.map(p => p.category))).map(category => (
                      <div key={category} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span>{category}</span>
                        <Badge variant="outline">
                          {products.filter(p => p.category === category).length} products
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Admin;
