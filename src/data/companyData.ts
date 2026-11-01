export interface CompanyInfo {
  name: string;
  tagline: string;
  phone: string;
  phoneFormatted: string;
  phoneTel: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  postcode: string;
  country: string;
  fullAddress: string;
  googleMapsUrl: string;
  copyright: string;
}

export const COMPANY: CompanyInfo = {
  name: 'MMR MOTORS LTD',
  tagline: 'Precision in Every Detail',
  phone: '07735 508394',
  phoneFormatted: '07735 508394',
  phoneTel: '+447735508394',
  email: 'mmrmotorsltd@gmail.com',
  addressLine1: 'Flat 9 Solar Court',
  addressLine2: '119 Sydenham Road, Croydon',
  postcode: 'CRO 2EZ',
  country: 'United Kingdom',
  fullAddress: 'Flat 9 Solar Court, 119 Sydenham Road, Croydon, CRO 2EZ, United Kingdom.',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Flat+9+Solar+Court,+119+Sydenham+Road,+Croydon,+CRO+2EZ,+United+Kingdom',
  copyright: '© 2026 MMR MOTORS LTD. All rights reserved.',
};

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  headline: string;
  description: string;
  image: string;
  features: string[];
  actionLabel: string;
}

import { IMAGES } from '../assets/images';

export const SERVICES: ServiceItem[] = [
  {
    id: 'maintenance',
    number: '01',
    title: 'VEHICLE MAINTENANCE',
    headline: 'Routine Vehicle Maintenance',
    description: 'Routine vehicle maintenance to help keep your vehicle in good working condition.',
    image: IMAGES.maintenance,
    features: [
      'Comprehensive oil & multi-filter renewal',
      'Fluid level, viscosity & cooling check',
      'Battery, alternator & electrical health probe',
      'Brake pad wear & disc tolerance check'
    ],
    actionLabel: 'Book Maintenance Enquiry'
  },
  {
    id: 'repair',
    number: '02',
    title: 'VEHICLE REPAIR SERVICES',
    headline: 'Automotive Repair Services',
    description: 'Automotive repair services to address vehicle issues and maintenance requirements.',
    image: IMAGES.repair,
    features: [
      'Engine mechanical diagnostics & fault recovery',
      'Brake caliper, rotor & hydraulic repairs',
      'Suspension damper & steering linkage rectifications',
      'Exhaust, cooling & powertrain solutions'
    ],
    actionLabel: 'Request Repair Assessment'
  },
  {
    id: 'sales',
    number: '03',
    title: 'USED CAR SALES',
    headline: 'Quality Pre-Owned Vehicles',
    description: 'Explore used-car options and contact our team for enquiries about available vehicles.',
    image: IMAGES.showroom,
    features: [
      'Hand-selected verified used vehicle stock',
      'Full mechanical pre-sale inspection completed',
      'Transparent vehicle documentation & advice',
      'Bespoke vehicle sourcing upon customer request'
    ],
    actionLabel: 'Enquire About Stock'
  }
];

export interface DiagnosticCheckpoint {
  id: string;
  title: string;
  code: string;
  status: string;
  summary: string;
  metrics: { label: string; value: string }[];
}

export const WORKSHOP_CHECKPOINTS: DiagnosticCheckpoint[] = [
  {
    id: 'diagnostics',
    title: 'ECU & Computer Diagnostics',
    code: 'OBD-II LIVE',
    status: 'SYSTEM HEALTHY',
    summary: 'Full electronic scanning of powertrain control modules, sensor parameters, and real-time fault code elimination.',
    metrics: [
      { label: 'DTC Fault Codes', value: '0 Detected' },
      { label: 'Bus Latency', value: '< 2.4 ms' },
      { label: 'Sensor Calibration', value: 'Nominal 100%' }
    ]
  },
  {
    id: 'brakes',
    title: 'Hydraulic Braking System',
    code: 'HYDR-BRK 04',
    status: 'OPTIMAL TOLERANCE',
    summary: 'Precision testing of ceramic/metallic pad thickness, disc runout measurements, and hydraulic line pressure.',
    metrics: [
      { label: 'Front Friction Pad', value: '9.8 mm (Good)' },
      { label: 'Hydraulic Pressure', value: '118 Bar' },
      { label: 'Fluid Moisture Content', value: '< 1.1%' }
    ]
  },
  {
    id: 'suspension',
    title: 'Suspension & Geometry',
    code: 'GEO-ALIGN 3D',
    status: 'CALIBRATED',
    summary: 'Multi-axis laser camber, toe, and caster alignment paired with coil spring and hydraulic damper inspection.',
    metrics: [
      { label: 'Front Toe Angle', value: '+0.04°' },
      { label: 'Damper Response', value: 'Balanced 96%' },
      { label: 'Bushing Integrity', value: 'Verified' }
    ]
  },
  {
    id: 'powertrain',
    title: 'Engine & Fluid Dynamics',
    code: 'PWR-FLUID-V8',
    status: 'PRISTINE',
    summary: 'Synthetic oil viscosity verification, coolant thermal capacity testing, and timing chain tension verification.',
    metrics: [
      { label: 'Operating Temp', value: '92°C Steady' },
      { label: 'Oil Pressure', value: '4.2 Bar @ 3k' },
      { label: 'Coolant PH Level', value: '8.4 (Alkaline)' }
    ]
  }
];

export const SHOWROOM_CATEGORIES = [
  {
    title: 'Executive & Luxury Saloons',
    summary: 'Refined long-distance cruisers with pristine maintenance history and high specification.',
    badge: 'Pre-Inspected',
  },
  {
    title: 'Performance & Sport',
    summary: 'Dynamic driver-focused vehicles mechanically evaluated for exceptional responsiveness.',
    badge: 'Workshop Checked',
  },
  {
    title: 'Family & Luxury SUVs',
    summary: 'Spacious, robust, and versatile models prepared for everyday practicality and family comfort.',
    badge: 'Full Health Check',
  },
  {
    title: 'Efficient Urban Compacts',
    summary: 'Cost-effective, reliable city runners with verified mileage and low running costs.',
    badge: 'Verified Records',
  }
];
