export interface Technology {
  id: string;
  name: string;
  subtitle: string;
  iconName: string;
  description: string;
  bestFor: string[];
  enabled: boolean;
}

export const TECHNOLOGIES_DATA: Technology[] = [
  {
    id: 'digital-press',
    name: 'High-Resolution Digital Press',
    subtitle: 'SHORT RUNS & RAPID TURNAROUND',
    iconName: 'Zap',
    description: 'Advanced production digital presses offering sharp text, vivid color calibration, and variable data printing for short-run orders.',
    bestFor: ['Visiting Cards', 'Urgent Pamphlets', 'Menu Cards'],
    enabled: true,
  },
  {
    id: 'commercial-offset',
    name: 'Commercial Offset Presses',
    subtitle: 'BULK PRODUCTION EFFICIENCY',
    iconName: 'Layers',
    description: 'Multi-color sheet-fed offset presses delivering maximum cost efficiency, uniform ink coverage, and exact Pantone matching.',
    bestFor: ['Bulk Flyers (5,000+)', 'Packaging Boxes', 'Brochures'],
    enabled: true,
  },
  {
    id: 'large-format-eco',
    name: 'Large Format Eco-Solvent Printers',
    subtitle: 'OUTDOOR FLEX & VINYL SIGNAGE',
    iconName: 'Maximize',
    description: 'High-density eco-solvent ink jet engines for weather-resistant outdoor flex banners, vinyl stickers, and backlit signage.',
    bestFor: ['Flex Banners', 'Standees', 'Vinyl Stickers'],
    enabled: true,
  },
  {
    id: 'post-press-finishing',
    name: 'Thermal Lamination & Die-Cutting',
    subtitle: 'TACTILE SURFACE FINISHING',
    iconName: 'Scissors',
    description: 'Hydraulic die-cutting machinery and automatic thermal lamination units for velvet matte, high gloss, and packaging box folds.',
    bestFor: ['Packaging Boxes', 'Paper Bags', 'Spot UV Cards'],
    enabled: true,
  },
];
