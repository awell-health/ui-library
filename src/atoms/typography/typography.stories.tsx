import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { HeadlineVariants, ParagraphsVariants } from './types'
import { Text, TypographyProps } from '.'
import { ThemeProvider } from '../themeProvider'

export default {
  title: 'Atoms/Typography',
  component: Text,
  argTypes: {
    variant: {
      options: [
        'hugeHeadline',
        'bigHeadline',
        'headline',
        'subHeadline',
        'smallHeadline',
        'tinyHeadline',
        'tinyHeadlineCaps',
        'discreetHeadline',
        'undersizeHeadline',
        'textRegular',
        'textMedium',
        'textSmall',
        'textSmallMedium',
        'textSmallBold',
        'inputPlaceholder',
      ],
      control: { type: 'radio' },
    },
  },
  decorators: [
    (StoryComponent) => (
      <div
        style={{
          padding: '2em',
          width: 'fit-content',
        }}
      >
        <ThemeProvider accentColor="#004ac2">
          <StoryComponent />
        </ThemeProvider>
      </div>
    ),
  ],
} as Meta

export const Typography: Story<TypographyProps> = ({ variant }) => {
  return (
    <Text variant={variant as ParagraphsVariants | HeadlineVariants}>
      Variant {variant}
    </Text>
  )
}
