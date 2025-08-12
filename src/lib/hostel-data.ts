
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
      { hostelDisplayName: "Boys Hostel - 1", staff: [{ role: "Warden", name: "N/A"}] },
      { hostelDisplayName: "Boys Hostel - 2", staff: [{ role: "Warden", name: "N/A"}] },
      { hostelDisplayName: "Boys Hostel - 3", staff: [{ role: "Warden", name: "N/A"}] },
      { hostelDisplayName: "Boys Hostel - 4", staff: [{ role: "Warden", name: "N/A"}] },
      { hostelDisplayName: "Boys Hostel - 5", staff: [{ role: "Warden", name: "N/A"}] },
      { hostelDisplayName: "Boys Hostel - 6", staff: [{ role: "Warden", name: "N/A"}] },
      { hostelDisplayName: "Boys Hostel - 7", staff: [{ role: "Warden", name: "N/A"}] },
      { hostelDisplayName: "Boys Hostel - 8", staff: [{ role: "Warden", name: "N/A"}] },
      { hostelDisplayName: "Girls Hostel - 1", staff: [{ role: "Warden", name: "N/A"}] },
      { hostelDisplayName: "Girls Hostel - 2", staff: [{ role: "Warden", name: "N/A"}] },
      { hostelDisplayName: "Girls Hostel - 3", staff: [{ role: "Warden", name: "N/A"}] },
      { hostelDisplayName: "300 PG Hostel", staff: [{ role: "Warden", name: "N/A"}] },
      { hostelDisplayName: "100 Married Ph.D. Hostel", staff: [{ role: "Warden", name: "N/A"}] },
  ];
