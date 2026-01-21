export const LISTING_CATEGORIES = [
  { id: 'appliances', label: 'Appliances', hidden: false, showPowerType: true, showWarranty: true },
  { id: 'furniture', label: 'Furniture', hidden: false, showPowerType: false, showWarranty: true },
  { id: 'electronics', label: 'Electronics', hidden: false, showPowerType: true, showWarranty: true },
  //vehicle
  { id: 'vehicles', label: 'Vehicles', hidden: false, showPowerType: true, showWarranty: false },
];
export const LISTING_SUBCATEGORIES = [
  { id: 'dryer', label: 'Dryer', category: 'appliances' },
  { id: 'washer', label: 'Washer', category: 'appliances' },
  { id: 'refrigerator', label: 'Refrigerator', category: 'appliances' },
  { id: 'freezer', label: 'Freezer', category: 'appliances' },
  { id: 'tv', label: 'TV', category: 'electronics' },
  { id: 'oven', label: 'Oven', category: 'appliances' },
  { id: 'microwave', label: 'Microwave', category: 'appliances' },
  { id: 'dishwasher', label: 'Dishwasher', category: 'appliances' },
  { id: 'washer-dryer', label: 'Washer & Dryer', category: 'appliances' },
  { id: 'washer-dryer-stackable', label: 'Washer & Dryer Stackable', category: 'appliances' },
  { id: 'other', label: 'Other', category: 'none' },
  { id: 'furniture', label: 'Furniture', category: 'furniture' },
];

export const POWER_TYPE_OPTIONS = [
  { value: 'electric', label: 'Electric', allowed: ['appliances', 'vehicles', 'electronics'] },
  { value: 'gas', label: 'Gas', allowed: ['appliances', 'vehicles'] },
  { value: 'battery', label: 'Battery', allowed: ['electronics'] },
  { value: 'hybrid', label: 'Hybrid', allowed: ['vehicles'] },
  { value: 'other', label: 'Other', allowed: ['all'] },
];

export const CONDITION_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'like_new', label: 'Like New' },
  { value: 'good', label: 'Good' },
]