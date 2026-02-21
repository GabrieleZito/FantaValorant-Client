export type Agent = {
    uuid: string;
    displayName: string;
    description: string;
    developerName: string;
    releaseDate: string;
    characterTags: string[] | null;
    displayIcon: string;
    displayIconSmall: string;
    bustPortrait: string;
    fullPortrait: string;
    fullPortraitV2: string;
    killfeedPortrait: string;
    minimapPortrait: string;
    homeScreenPromoTileImage: string | null;
    background: string;
    backgroundGradientColors: string[];
    assethPath: string;
    isFullPortraitRightFacing: boolean;
    isPlayableCharacter: boolean;
    isAvailableForTest: boolean;
    isBaseContent: boolean;
    role: {
        uuid: string;
        displayName: string;
        description: string;
        displayIcon: string;
        assetPath: string;
    };
    recruitmentData: {
        counterId: string;
        milestoneId: string;
        milestoneThreshold: number;
        useLevelVpCostOverride: boolean;
        levelVpCostOverride: number;
        startDate: string;
        endDate: string;
    } | null;
    abilities: Ability[];
    voiceLine: null;
};

type Ability = {
    slot: string;
    displayName: string;
    description: string;
    displayIcon: string;
};
