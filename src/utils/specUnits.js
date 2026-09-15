/**
 * Technical Specification Unit Mapping Utility for Detron Products
 * Based on Detron official technical datasheets and catalogues
 */

export const SPEC_UNIT_MAPPING = {
  'worktable diameter': 'mm / inch',
  'table diameter': 'mm / inch',
  'center bore diameter': 'mm / inch',
  'through-bore diameter': 'mm / inch',
  'through bore diameter': 'mm / inch',
  'thru-bore diameter': 'mm / inch',
  'pitch of rotary axis': 'mm / inch',
  'height of table (horizontal)': 'mm / inch',
  'height of center (vertical)': 'mm / inch',
  'center height (vertical)': 'mm / inch',
  'center height': 'mm / inch',
  'width of t-slot': 'mm / inch',
  'width of guide block': 'mm / inch',
  'clamping method / pressure': 'MPa / psi',
  'clamping method & pressure': 'MPa / psi',
  'clamping pressure': 'MPa / psi',
  'clamping torque': 'N.m / ft. lbs.',
  'servo motor spec': '-',
  'transmission ratio': '-',
  'gear ratio': '-',
  'max. table speed / at specified servo motor speed': 'min⁻¹',
  'max table speed': 'min⁻¹',
  'max. table speed': 'min⁻¹',
  'standard loading inertia': 'kg.m²',
  'standard loading inertia*': 'kg.m²',
  'maximum loading inertia': 'kg.m²',
  'maximum loading inertia*': 'kg.m²',
  'allowable loading inertia': 'kg.m²',
  'resolution': 'deg.',
  'indexing accuracy': 'sec.',
  'repeatability': 'sec.',
  'repeatability (iso 230-2 / jis b6192)': 'sec.',
  'repeatability (iso 230-2/jis b6192)': 'sec.',
  'repeatability (jis b6330)': 'sec.',
  'net weight (servo motor excluded)': 'kg / lb',
  'net weight': 'kg / lb',
  'allowable load (vert / horiz / tailstock)': 'kg / lb',
  'allowable load (vert / tailstock)': 'kg / lb',
  'allowable load (vertical)': 'kg / lb',
  'allowable load (horizontal)': 'kg / lb',
  'allowable load (tailstock)': 'kg / lb',
  'allowable loading capacity': 'kg / lb',
  'allowable loading capacity (vertical)': 'kg / lb',
  'allowable loading capacity (horizontal)': 'kg / lb',
  'allowable loading capacity (rotary tailstock applied)': 'kg / lb',
  'allowable cutting force f': 'N / lbs',
  'allowable cutting force': 'N / lbs',
  'allowable cutting torque fxl (cylindrical / radial)': 'N.m / ft. lbs.',
  'allowable cutting torque fxl (cylindrical)': 'N.m / ft. lbs.',
  'allowable cutting torque fxl (radial)': 'N.m / ft. lbs.',
  'allowable cutting torque fxl': 'N.m / ft. lbs.',
  'allowable cutting torque': 'N.m / ft. lbs.',
  'drive torque': 'N.m / ft. lbs.',
  'allowable max rotary joint': 'Port',
  'rotary joint': 'Port',
  'tilting range': 'deg.',
  'tilt angle': 'deg.',
  'pallet size': 'mm / inch',
  'pallet dimensions': 'mm / inch',
  'maximum load': 'kg / lb',
  'pallet change time': 'sec.',
  'number of spindles': 'Qty',
  'cooling system': '-',
  'operating temperature': '°C',
  'power supply': 'V'
};

/**
 * Returns the exact engineering unit for a given specification key.
 * @param {string} key - The technical parameter name (e.g., 'Worktable Diameter')
 * @param {string} [val] - Optional value string to help deduce units for custom keys
 * @returns {string} The standardized unit string (e.g., 'mm / inch', 'N.m / ft. lbs.')
 */
export function getSpecificationUnit(key, val = '') {
  if (!key) return '-';
  const cleanKey = key.trim().toLowerCase();

  // 1. Direct exact dictionary match
  if (SPEC_UNIT_MAPPING[cleanKey]) {
    return SPEC_UNIT_MAPPING[cleanKey];
  }

  // 2. Pattern based fallback checks
  if (cleanKey.includes('diameter') || cleanKey.includes('width') || cleanKey.includes('height') || cleanKey.includes('pitch') || cleanKey.includes('stroke') || cleanKey.includes('travel') || cleanKey.includes('dimensions')) {
    return 'mm / inch';
  }
  if (cleanKey.includes('clamping method') || cleanKey.includes('pressure')) {
    return 'MPa / psi';
  }
  if (cleanKey.includes('torque') || cleanKey.includes('fxl')) {
    return 'N.m / ft. lbs.';
  }
  if (cleanKey.includes('speed') || cleanKey.includes('rpm') || cleanKey.includes('min-1') || cleanKey.includes('min⁻¹')) {
    return 'min⁻¹';
  }
  if (cleanKey.includes('inertia') || cleanKey.includes('w.d')) {
    return 'kg.m²';
  }
  if (cleanKey.includes('accuracy') || cleanKey.includes('repeatability')) {
    return 'sec.';
  }
  if (cleanKey.includes('resolution') || cleanKey.includes('tilt') || cleanKey.includes('angle')) {
    return 'deg.';
  }
  if (cleanKey.includes('weight') || cleanKey.includes('load') || cleanKey.includes('mass') || cleanKey.includes('capacity')) {
    return 'kg / lb';
  }
  if (cleanKey.includes('force')) {
    return 'N / lbs';
  }
  if (cleanKey.includes('time')) {
    return 'sec.';
  }
  if (cleanKey.includes('joint') || cleanKey.includes('port')) {
    return 'Port';
  }
  if (cleanKey.includes('ratio') || cleanKey.includes('motor') || cleanKey.includes('cooling')) {
    return '-';
  }

  // 3. Inspect value hints if available
  if (typeof val === 'string') {
    const v = val.toLowerCase();
    if (v.includes('n.m') || v.includes('ft.lbs') || v.includes('ft. lbs')) return 'N.m / ft. lbs.';
    if (v.includes('mpa') || v.includes('psi')) return 'MPa / psi';
    if (v.includes('kg.m²') || v.includes('kg.m2')) return 'kg.m²';
    if (v.includes('min⁻¹') || v.includes('rpm')) return 'min⁻¹';
    if (v.includes('sec')) return 'sec.';
    if (v.includes('deg') || v.includes('°')) return 'deg.';
    if (v.includes('kg') || v.includes('lbs') || v.includes('lb')) return 'kg / lb';
    if (v.includes('mm') || v.includes('inch') || v.includes('"')) return 'mm / inch';
    if (v.includes('n ') || v.includes('kn')) return 'N / lbs';
  }

  return '-';
}
