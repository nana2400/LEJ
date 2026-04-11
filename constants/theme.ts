export const colors = {
    background: '#fff9e3',
    foreground: '#081126',
    card: '#fff8e7',
    muted: '#f6eecf',
    mutedForeground: 'rgba(0, 0, 0, 0.6)',
    primary: '#081126',
    accent: '#ea7a53',
    border: 'rgba(0, 0, 0, 0.1)',
    success: '#16a34a',
    descriptive: 'dc2626',
    subscription: '#8fd1bd',
} as const;

export const spacing = {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 44,
    12: 48,
    13: 52,
    14: 56,
    15: 60,
    16: 64,
    17: 68,
    18: 72,
    19: 76,
    20: 80,
} as const;

export const components = {
    tabBar: {
        height: spacing[18],
        horizontalInset: spacing[4],
        radius: spacing[6],
        iconFrame: spacing[12],
        itemPaddingVertical: spacing[2],

    },
} as const;

export const theme = {
    colors,
    spacing,
    components,
} as const;