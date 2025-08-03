export interface HostelWardenInfo {
    role: string;
    name: string;
    department: string;
    phone?: string;
    email?: string;
  }
  
  export interface HostelWardenInfoData {
    hostelDisplayName: string;
    staff: HostelWardenInfo[];
  }
  
  export const wardenStaffData: HostelWardenInfoData[] = [
      {
          hostelDisplayName: "Aryabhata Hostel",
          staff: [
              {
                  role: "Warden",
                  name: "Dr. L. C. Saikia",
                  department: "Dept. of EE",
                  phone: "+91-9435384180",
                  email: "lcs@ee.nits.ac.in"
              },
              {
                  role: "Associate Warden",
                  name: "Dr. K. L. Baishnab",
                  department: "Dept. of ECE"
              }
          ]
      },
      {
          hostelDisplayName: "Bhabha Hostel",
          staff: [
              {
                  role: "Warden",
                  name: "Dr. J. Hazarika",
                  department: "Dept. of CE",
                  phone: "+91-9954087611",
                  email: "jhaz@ce.nits.ac.in"
              },
              {
                  role: "Associate Warden",
                  name: "Dr. S. K. Singh",
                  department: "Dept. of ME",
                  phone: "+91-9401732959"
              }
          ]
      },
      {
          hostelDisplayName: "Ramanujan Hostel",
          staff: [
              {
                  role: "Warden",
                  name: "Dr. Malaya Dutta",
                  department: "Dept. of CSE",
                  phone: "+91-9435501191"
              },
              {
                  role: "Associate Warden",
                  name: "Dr. B. K. Roy",
                  department: "Dept. of CE"
              }
          ]
      },
      {
          hostelDisplayName: "Vivekananda Hostel",
          staff: [
              {
                  role: "Warden",
                  name: "Dr. S. K. Tripathy",
                  department: "Dept. of CSE",
                  phone: "+91-9954784650",
                  email: "sanjeeb@cse.nits.ac.in"
              }
          ]
      },
      {
          hostelDisplayName: "Gargi Hostel",
          staff: [
              {
                  role: "Warden",
                  name: "Dr. P. J. Ksh.",
                  department: "Dept. of CE",
                  phone: "+91-9435503023",
                  email: "pritha@ce.nits.ac.in"
              },
              {
                  role: "Associate Warden",
                  name: "Dr. R. H. Laskar",
                  department: "Dept. of ECE"
              }
          ]
      },
      {
          hostelDisplayName: "Sarojini Hostel",
          staff: [
              {
                  role: "Warden",
                  name: "Dr. S. Panja",
                  department: "Dept. of SOM",
                  phone: "+91-9435372506"
              },
              {
                  role: "Associate Warden",
                  name: "Dr. N. B. Dev Choudhury",
                  department: "Dept. of ME"
              }
          ]
      },
      {
          hostelDisplayName: "Ahilya Devi Hostel",
          staff: [
              {
                  role: "Warden",
                  name: "Dr. U. Kumar",
                  department: "Dept. of CE",
                  phone: "+91-9957187974",
                  email: "usha@ce.nits.ac.in"
              },
              {
                  role: "Associate Warden",
                  name: "Dr. A. Das",
                  department: "Dept. of EE",
                  phone: "+91-9706342892"
              }
          ]
      },
      {
          hostelDisplayName: "Kapil Hostel",
          staff: [
              {
                  role: "Warden",
                  name: "Dr. B. Dam",
                  department: "Dept. of EE",
                  phone: "+91-9435501869"
              },
              {
                  role: "Associate Warden",
                  name: "Dr. A. K. Singh",
                  department: "Dept. of EE",
                  phone: "+91-9957189182"
              }
          ]
      },
      {
          hostelDisplayName: "Satish Dhawan Hostel",
          staff: [
              {
                  role: "Warden",
                  name: "Dr. P. K. Patowari",
                  department: "Dept. of ME",
                  phone: "+91-9435500363"
              },
              {
                  role: "Associate Warden",
                  name: "Dr. Y. Singh",
                  department: "Dept. of ME",
                  phone: "+91-9957189234"
              }
          ]
      },
      {
          hostelDisplayName: "Vikram Sarabhai Hostel",
          staff: [
              {
                  role: "Warden",
                  name: "Dr. A. Biswas",
                  department: "Dept. of CSE",
                  phone: "+91-9435500428"
              }
          ]
      },
      {
          hostelDisplayName: "Visvesvaraya Hostel",
          staff: [
              {
                  role: "Warden",
                  name: "Dr. R. D. Misra",
                  department: "Dept. of ME",
                  phone: "+91-9435501980"
              },
              {
                  role: "Associate Warden",
                  name: "Dr. B. Das",
                  department: "Dept. of ME"
              }
          ]
      },
      {
          hostelDisplayName: "Abdul Kalam Hostel",
          staff: [
              {
                  role: "Warden",
                  name: "Dr. K. C. Sahoo",
                  department: "Dept. of ME",
                  phone: "+91-9957189252",
                  email: "kcsahoo@mech.nits.ac.in"
              }
          ]
      },
      {
          hostelDisplayName: "C.V. Raman Hostel",
          staff: [
              {
                  role: "Warden",
                  name: "Dr. S. Das",
                  department: "Dept. of CE",
                  phone: "+91-9435501067",
                  email: "saptarshi@ce.nits.ac.in"
              },
              {
                  role: "Associate Warden",
                  name: "Dr. D. K. Gogoi",
                  department: "Dept. of CE"
              }
          ]
      }
  ];
