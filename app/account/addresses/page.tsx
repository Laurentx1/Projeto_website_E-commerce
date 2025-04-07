"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Home, Plus, MapPin, Pencil, Trash2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

/**
 * AddressesPage component - Manages user's shipping and billing addresses
 *
 * Features:
 * - Address listing
 * - Add new address
 * - Edit existing address
 * - Delete address
 * - Set default address
 */
export default function AddressesPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [addresses, setAddresses] = useState([
    {
      id: "addr-1",
      name: "John Doe",
      address: "123 Main St, Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
      phone: "(555) 123-4567",
      isDefault: true,
    },
    {
      id: "addr-2",
      name: "John Doe",
      address: "456 Park Ave",
      city: "Boston",
      state: "MA",
      zip: "02108",
      country: "United States",
      phone: "(555) 987-6543",
      isDefault: false,
    },
  ])

  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [editingAddress, setEditingAddress] = useState<null | (typeof addresses)[0]>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
    isDefault: false,
  })

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle checkbox change
  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isDefault: checked }))
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      phone: "",
      isDefault: false,
    })
    setEditingAddress(null)
  }

  // Open edit dialog
  const openEditDialog = (address: (typeof addresses)[0]) => {
    setEditingAddress(address)
    setFormData({
      name: address.name,
      address: address.address,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country,
      phone: address.phone || "",
      isDefault: address.isDefault,
    })
    setIsAddingAddress(true)
  }

  // Save address
  const saveAddress = () => {
    // Validate form
    if (
      !formData.name ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zip ||
      !formData.country
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // If setting as default, update other addresses
    let updatedAddresses = [...addresses]
    if (formData.isDefault) {
      updatedAddresses = updatedAddresses.map((addr) => ({
        ...addr,
        isDefault: false,
      }))
    }

    // If editing existing address
    if (editingAddress) {
      updatedAddresses = updatedAddresses.map((addr) =>
        addr.id === editingAddress.id
          ? {
              ...addr,
              name: formData.name,
              address: formData.address,
              city: formData.city,
              state: formData.state,
              zip: formData.zip,
              country: formData.country,
              phone: formData.phone,
              isDefault: formData.isDefault,
            }
          : addr,
      )

      toast({
        title: "Address Updated",
        description: "Your address has been updated successfully",
      })
    }
    // Adding new address
    else {
      const newAddress = {
        id: `addr-${Date.now()}`,
        name: formData.name,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country,
        phone: formData.phone,
        isDefault: formData.isDefault || addresses.length === 0, // First address is default
      }

      updatedAddresses.push(newAddress)

      toast({
        title: "Address Added",
        description: "Your new address has been added successfully",
      })
    }

    setAddresses(updatedAddresses)
    setIsAddingAddress(false)
    resetForm()
  }

  // Delete address
  const deleteAddress = (id: string) => {
    const addressToDelete = addresses.find((addr) => addr.id === id)
    const isDefault = addressToDelete?.isDefault

    let updatedAddresses = addresses.filter((addr) => addr.id !== id)

    // If deleted address was default, set first remaining address as default
    if (isDefault && updatedAddresses.length > 0) {
      updatedAddresses = updatedAddresses.map((addr, index) => ({
        ...addr,
        isDefault: index === 0,
      }))
    }

    setAddresses(updatedAddresses)

    toast({
      title: "Address Deleted",
      description: "The address has been removed from your account",
    })
  }

  // Set address as default
  const setAsDefault = (id: string) => {
    const updatedAddresses = addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === id,
    }))

    setAddresses(updatedAddresses)

    toast({
      title: "Default Address Updated",
      description: "Your default shipping address has been updated",
    })
  }

  // If not logged in, redirect to login
  if (!isLoggedIn) {
    return (
      <div className="container flex items-center justify-center px-4 py-12 md:px-6 md:py-16">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign In Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Please sign in to manage your addresses</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setIsLoggedIn(true)} className="w-full">
              Sign In
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">My Addresses</h1>
          <p className="text-muted-foreground">Manage your shipping and billing addresses</p>
        </div>

        <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>{editingAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
              <DialogDescription>
                {editingAddress
                  ? "Update your address details below"
                  : "Fill in the information below to add a new address to your account"}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" name="state" value={formData.state} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zip">Postal Code</Label>
                  <Input id="zip" name="zip" value={formData.zip} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" name="country" value={formData.country} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="default"
                  checked={formData.isDefault}
                  onCheckedChange={handleCheckboxChange}
                  disabled={editingAddress?.isDefault}
                />
                <Label htmlFor="default" className="text-sm font-normal">
                  Set as default shipping address
                </Label>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddingAddress(false)
                  resetForm()
                }}
              >
                Cancel
              </Button>
              <Button onClick={saveAddress}>{editingAddress ? "Update Address" : "Save Address"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-8">
        {addresses.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {addresses.map((address) => (
              <Card key={address.id} className={address.isDefault ? "border-primary" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Home className="mr-2 h-4 w-4 text-primary" />
                      <CardTitle className="text-lg">{address.name}</CardTitle>
                    </div>
                    {address.isDefault && (
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        Default
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    <p>{address.address}</p>
                    <p>
                      {address.city}, {address.state} {address.zip}
                    </p>
                    <p>{address.country}</p>
                    {address.phone && <p className="mt-1">{address.phone}</p>}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(address)}>
                      <Pencil className="mr-2 h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteAddress(address.id)}
                      disabled={addresses.length === 1} // Can't delete last address
                    >
                      <Trash2 className="mr-2 h-3 w-3" />
                      Delete
                    </Button>
                  </div>

                  {!address.isDefault && (
                    <Button variant="ghost" size="sm" onClick={() => setAsDefault(address.id)}>
                      <MapPin className="mr-2 h-3 w-3" />
                      Set as Default
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No Addresses Found</h3>
            <p className="mt-2 text-sm text-muted-foreground">You haven't added any addresses to your account yet</p>
            <Button onClick={() => setIsAddingAddress(true)} className="mt-4">
              Add Your First Address
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

