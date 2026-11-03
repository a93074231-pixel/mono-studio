
import pool from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      company,
      projectTypes,
      budget,
      timeline,
      message,
    } = body;

    // Validate required fields
    if (
      !name?.trim() ||
      !email?.trim() ||
      !message?.trim()
    ) {
      return Response.json(
        {
          success: false,
          message: "Name, email and message are required.",
        },
        { status: 400 }
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return Response.json(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    // Validate input lengths
    if (
      name.trim().length > 120 ||
      email.trim().length > 254 ||
      (company && company.trim().length > 160) ||
      message.trim().length > 10000
    ) {
      return Response.json(
        {
          success: false,
          message: "One or more fields exceed the allowed length.",
        },
        { status: 400 }
      );
    }

    // Validate project types
    const allowedTypes = [
      "Brand identity",
      "Website design",
      "Web development",
      "Digital experience",
      "Campaign / Art direction",
      "Something else",
    ];

    const selectedTypes = Array.isArray(projectTypes)
      ? [...new Set(projectTypes)]
      : [];

    if (!selectedTypes.every((type) => allowedTypes.includes(type))) {
      return Response.json(
        {
          success: false,
          message: "Invalid project type selected.",
        },
        { status: 400 }
      );
    }

    // Insert enquiry into PostgreSQL
    const result = await pool.query(
      `INSERT INTO enquiries (
        name,
        email,
        company,
        project_types,
        budget,
        timeline,
        message
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, created_at`,
      [
        name.trim(),
        email.trim().toLowerCase(),
        company?.trim() || null,
        selectedTypes,
        budget?.trim() || null,
        timeline?.trim() || null,
        message.trim(),
      ]
    );

    return Response.json(
      {
        success: true,
        message: "Your enquiry has been submitted successfully!",
        enquiry: result.rows[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API error:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to submit your enquiry. Please try again.",
      },
      { status: 500 }
    );
  }
}
