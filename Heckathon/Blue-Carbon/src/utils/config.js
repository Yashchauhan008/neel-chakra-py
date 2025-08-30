// Configuration for Blue Carbon Dashboard
export const config = {
  defaults: {
    lonMin: 88.7,
    latMin: 21.5,
    lonMax: 89.0,
    latMax: 22.0,
    startDate: '2023-01-01',
    endDate: '2023-03-01',
    dataset: 'MODIS/006/MOD13Q1'
  }
};

// Available datasets
export const datasets = {
  'MODIS/006/MOD13Q1': {
    name: 'MODIS Terra NDVI/EVI (MOD13Q1)',
    description: '16-day composites at 250m resolution',
    provider: 'NASA Terra',
    temporal_resolution: '16 days',
    spatial_resolution: '250m',
    date_range: '2000 - Present',
    data_type: 'Precomputed NDVI/EVI',
    use_case: 'Optimal for Blue Carbon ecosystem monitoring',
    pros: ['Long time series (25+ years)', 'Optimal 250m resolution', 'Global coverage', 'Precomputed indices', 'Reliable quality'],
    cons: ['16-day intervals only', 'Potential cloud contamination']
  }
};
