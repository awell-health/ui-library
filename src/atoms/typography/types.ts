export type HeadlineVariants =
    | 'hugeHeadline'
    | 'bigHeadline'
    | 'headline'
    | 'subHeadline'
    | 'smallHeadline'
    | 'tinyHeadline'
    | 'tinyHeadlineCaps'
    | 'discreetHeadline'
    | 'undersizeHeadline'

export type ParagraphsVariants =
    | 'textRegular'
    | 'textMedium'
    | 'textSmall'
    | 'textSmallMedium'
    | 'textSmallBold'
    | 'inputPlaceholder'
    | 'textTinyHint'

export type TextVariants = ParagraphsVariants | HeadlineVariants
