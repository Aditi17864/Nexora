import { User } from "../models/User";

export const seedDatabase = async () => {
  try {
    // Check if super admin already exists
    const superAdminExists = await User.findOne({ role: "super_admin" });
    
    if (superAdminExists) {
      console.log("✅ Super admin already exists");
      return;
    }

    // Create default super admin
    const superAdmin = new User({
      name: "Dr. Rajesh Kumar",
      email: "admin@reddy-patil.edu",
      password: "Admin@123",
      role: "super_admin",
    });

    await superAdmin.save();
    console.log("✅ Default super admin created successfully");
    console.log("📧 Email: admin@reddy-patil.edu");
    console.log("🔒 Password: Admin@123");
  } catch (error: any) {
    console.error("❌ Database seeding failed:", error.message || error);
  }
};
