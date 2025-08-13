
export interface HostelWardenInfo {
    role: string;
    name: string;
    department?: string;
    phone?: string;
    email?: string;
  }
  
  export interface HostelWardenInfoData {
    hostelDisplayName: string;
    staff: HostelWardenInfo[];
  }
  
  export const wardenStaffData: HostelWardenInfoData[] = [
      { 
        hostelDisplayName: "Boys Hostel - 1", 
        staff: [
          { role: "Warden", name: "Dr. Partha Pakray", department: "Department of Computer Science & Engineering", phone: "+91-8259065018", email: "partha@cse.nits.ac.in" }
        ] 
      },
      { 
        hostelDisplayName: "Boys Hostel - 2", 
        staff: [
          { role: "Warden", name: "Dr. Shankar K.", department: "Department of Electronics & Instrumentation Engineering", phone: "+91-8870525684", email: "shankar@ei.nits.ac.in" }
        ] 
      },
      { 
        hostelDisplayName: "Boys Hostel - 3", 
        staff: [
          { role: "Warden", name: "Dr. Biswa Nath Ghosh", department: "Department of Chemistry", phone: "+91-8018123682", email: "bnghosh@che.nits.ac.in" }
        ] 
      },
      { 
        hostelDisplayName: "Boys Hostel - 4", 
        staff: [
          { role: "Warden", name: "Dr. Simanchar Kar", department: "Department of Mechanical Engineering", phone: "+91-8249994335", email: "simanchal@mech.nits.ac.in" },
          { role: "Assistant Warden", name: "Dr. Santosh Kumar", department: "Department of Mechanical Engineering", phone: "+91-9342264276", email: "santosh@mech.nits.ac.in" }
        ] 
      },
      { hostelDisplayName: "Boys Hostel - 5", staff: [{ role: "Warden", name: "N/A"}] },
      { 
        hostelDisplayName: "Boys Hostel - 6", 
        staff: [
          { role: "Warden", name: "Dr. Chayan Bhattacharjee", department: "Department of Electrical Engineering", phone: "+91-9435730356", email: "chayan@ee.nits.ac.in" },
          { role: "Assistant Warden", name: "Dr. Biswarup Ganguly", department: "Department of Electrical Engineering", email: "bganguly@ee.nits.ac.in" }
        ] 
      },
      { 
        hostelDisplayName: "Boys Hostel - 7", 
        staff: [
          { role: "Warden", name: "Dr. Sushant Negi", department: "Department of Mechanical Engineering", phone: "+91-9816111560", email: "sushant@mech.nits.ac.in" },
          { role: "Assistant Warden", name: "Dr. Parikshit Saikia", department: "Department of Computer Science & Engineering", phone: "+91-9864979385", email: "parikshit@cse.nits.ac.in" }
        ] 
      },
      { 
        hostelDisplayName: "Boys Hostel - 8", 
        staff: [
          { role: "Warden", name: "Dr. Arun Kumar", department: "Department of Electronics & Communication Engineering", phone: "+91-9431404941", email: "arunkumar@ece.nits.ac.in" },
          { role: "Assistant Warden", name: "Dr. Himanshu Karan", department: "Department of Electronics & Communication Engineering", phone: "+91-9732003148", email: "himanshu@ece.nits.ac.in" },
          { role: "Assistant Warden", name: "Dr. Somnath Santra", department: "Department of Mechanical Engineering", email: "somnath@mech.nits.ac.in" }
        ] 
      },
      {
        hostelDisplayName: "Boys Hostel - 9A (J.C. Bose Hall)",
        staff: [
          { role: "Warden", name: "Dr. Sudipta Chakraborty", department: "Department of Electronics & Instrumentation Engineering", phone: "+91-9040429561", email: "sudipta@ei.nits.ac.in" },
          { role: "Assistant Warden", name: "Dr. Ambrish Devanshu", department: "Department of Electrical Engineering", phone: "+91-9101420179", email: "ambrish@ee.nits.ac.in" }
        ]
      },
      {
        hostelDisplayName: "Boys Hostel - 9B (S. Ramanujan Hall)",
        staff: [
          { role: "Warden", name: "Dr. Anup Kumar Sharma", department: "Department of Electronics & Instrumentation Engineering", phone: "+91-9672505707", email: "anup@ei.nits.ac.in" },
          { role: "Assistant Warden", name: "Dr. Gautam Choubey", department: "Department of Mechanical Engineering", phone: "+91-9127244062", email: "gautamchoubey@mech.nits.ac.in" }
        ]
      },
      {
        hostelDisplayName: "Boys Hostel - 9C (C.V. Raman Hall)",
        staff: [
          { role: "Warden", name: "Dr. Subrata Bera", department: "Department of Mathematics", phone: "+91-8811046446", email: "subrata@math.nits.ac.in" }
        ]
      },
      {
        hostelDisplayName: "Boys Hostel - 9D (Vikram Sarabhai Hall)",
        staff: [
          { role: "Warden", name: "Dr. Vipin Chandra Pal", department: "Department of Electronics & Instrumentation Engineering", phone: "+91-7007231973", email: "vipin@ei.nits.ac.in" },
          { role: "Assistant Warden", name: "Dr. Jyotirmoy Haloi", department: "Department of Civil Engineering", phone: "+91-8876458563", email: "jyotirmoy@civil.nits.ac.in" }
        ]
      },
      {
        hostelDisplayName: "Aryabhata Hostel",
        staff: [
          { role: "Warden", name: "Dr. Kavicharan Mummaneni", department: "Department of Electronics & Communication Engineering", phone: "+91-8919656541", email: "kavicharan@ece.nits.ac.in" },
          { role: "Assistant Warden", name: "Dr. Prosun Mandal", department: "Department of Mechanical Engineering", phone: "+91-9681386603", email: "prosun@mech.nits.ac.in" },
          { role: "Assistant Warden", name: "Dr. Santan Kumar", department: "Department of Mathematics", phone: "+91-8292003793", email: "santan@math.nits.ac.in" }
        ]
      },
      { 
        hostelDisplayName: "Girls Hostel - 1", 
        staff: [
          { role: "Warden", name: "Dr. Tripti Goel", department: "Department of Electronics & Communication Engineering", phone: "+91-9541345413", email: "triptigoel@ece.nits.ac.in" }
        ] 
      },
      {
        hostelDisplayName: "Girls Hostel - 1A & 1B",
        staff: [
          { role: "Warden", name: "Dr. Asha Rani M. A.", department: "Department of Electrical Engineering", phone: "+91-8075692305", email: "asharani@ee.nits.ac.in" }
        ]
      },
      { 
        hostelDisplayName: "Girls Hostel - 2", 
        staff: [
          { role: "Warden", name: "Dr. M.V.Swati", department: "Department of Electronics & Communication Engineering", phone: "+91-8876411266", email: "swati@ece.nits.ac.in" }
        ] 
      },
      { 
        hostelDisplayName: "Girls Hostel - 3 (K.C. Hall)", 
        staff: [
          { role: "Warden", name: "Dr Panchali Bhattacharya", department: "Department of Humanities and Social Sciences", email: "panchali@hum.nits.ac.in" }
        ] 
      },
      {
        hostelDisplayName: "Girls Hostel - 4",
        staff: [
          { role: "Warden", name: "Dr. Binoti Patro", department: "Department of Management Studies", phone: "+91-9708117720", email: "binotipatro@mba.nits.ac.in" }
        ]
      },
      {
        hostelDisplayName: "A. Lalitha Hall (MSH Block A,B,C)",
        staff: [
          { role: "Warden", name: "Dr. Tanay Nayak", department: "Department of Management Studies", phone: "+91-8249325452", email: "tanayanayak@mba.nits.ac.in" }
        ]
      },
      { 
        hostelDisplayName: "Married Scholar's Hostel", 
        staff: [
          { role: "Warden", name: "Dr. Kulkarni Vihangraj Vijaykumar", department: "Department of Civil Engineering", phone: "+91-9207344531", email: "kulkarni@civil.nits.ac.in" }
        ] 
      },
  ];
