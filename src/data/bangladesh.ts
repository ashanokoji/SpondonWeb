export interface Upazila {
  id: string;
  name: string;
  bn_name: string;
}

export interface District {
  id: string;
  name: string;
  bn_name: string;
  upazilas: Upazila[];
}

export interface Division {
  id: string;
  name: string;
  bn_name: string;
  districts: District[];
}

// Sample data - a complete list would be very long, this provides a representative structure
export const bangladeshData: Division[] = [
  {
    id: "1",
    name: "Dhaka",
    bn_name: "ঢাকা",
    districts: [
      {
        id: "1",
        name: "Dhaka",
        bn_name: "ঢাকা",
        upazilas: [
          { id: "1", name: "Dhamrai", bn_name: "ধামরাই" },
          { id: "2", name: "Dohar", bn_name: "দোহার" },
          { id: "3", name: "Keraniganj", bn_name: "কেরানীগঞ্জ" },
          { id: "4", name: "Nawabganj", bn_name: "নবাবগঞ্জ" },
          { id: "5", name: "Savar", bn_name: "সাভার" }
        ]
      },
      {
        id: "2",
        name: "Gazipur",
        bn_name: "গাজীপুর",
        upazilas: [
          { id: "6", name: "Gazipur Sadar", bn_name: "গাজীপুর সদর" },
          { id: "7", name: "Kaliakair", bn_name: "কালিয়াকৈর" },
          { id: "8", name: "Kaliganj", bn_name: "কালীগঞ্জ" },
          { id: "9", name: "Kapasia", bn_name: "কাপাসিয়া" },
          { id: "10", name: "Sreepur", bn_name: "শ্রীপুর" }
        ]
      },
      {
        id: "3",
        name: "Narayanganj",
        bn_name: "নারায়ণগঞ্জ",
        upazilas: [
          { id: "11", name: "Araihazar", bn_name: "আড়াইহাজার" },
          { id: "12", name: "Bandar", bn_name: "বন্দর" },
          { id: "13", name: "Narayanganj Sadar", bn_name: "নারায়ণগঞ্জ সদর" },
          { id: "14", name: "Rupganj", bn_name: "রূপগঞ্জ" },
          { id: "15", name: "Sonargaon", bn_name: "সোনারগাঁ" }
        ]
      }
    ]
  },
  {
    id: "2",
    name: "Chattogram",
    bn_name: "চট্টগ্রাম",
    districts: [
      {
        id: "4",
        name: "Chattogram",
        bn_name: "চট্টগ্রাম",
        upazilas: [
          { id: "16", name: "Anwara", bn_name: "আনোয়ারা" },
          { id: "17", name: "Banshkhali", bn_name: "বাঁশখালী" },
          { id: "18", name: "Boalkhali", bn_name: "বোয়ালখালী" },
          { id: "19", name: "Chandanaish", bn_name: "চন্দনাইশ" },
          { id: "20", name: "Fatikchhari", bn_name: "ফটিকছড়ি" }
        ]
      }
    ]
  }
];

export const getAllDistricts = (): District[] => {
  return bangladeshData.flatMap(div => div.districts);
};

export const getUpazilasForDistrict = (districtName: string): Upazila[] => {
  const district = getAllDistricts().find(d => d.name === districtName);
  return district ? district.upazilas : [];
};
