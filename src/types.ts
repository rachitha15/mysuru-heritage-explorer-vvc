export interface HeritageSite {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  recommendedMerchant: {
    name: string;
    offer: string;
    distance: string;
  };
  voucherCode: string;
  isInstagramTrending?: boolean;
  instagramHandle?: string;
  reelsCount?: string;
  weatherOptimalTime?: {
    currentTemp: string;
    condition: string;
    bestMonths: string;
    bestTimeOfDay: string;
  };
  facilities?: {
    restrooms: boolean;
    water: boolean;
    wifi: boolean;
    parking: boolean;
    accessibility: boolean;
    ecoCharging?: boolean; // EV Charging
  };
  greenTips?: string;
}

export type AppStateStage = "SCANNER" | "DISCOVERY" | "VOUCHER";

export interface ActiveSession {
  siteId: string;
  stage: AppStateStage;
  startTime: number; // timestamp
  discoverySecondsLeft: number;
  voucherSecondsLeft: number;
  isPaused: boolean;
  historyGenerated?: string;
  claimTimestamp?: number; // if claimed
}
