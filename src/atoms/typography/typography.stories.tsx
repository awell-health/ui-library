import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { HeadlineVariants, ParagraphsVariants } from './types'
import { HeadingMain, Text, TypographyProps } from '.'

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
          padding: '1em',
          width: 'fit-content',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
} as Meta

export const Variants: Story<TypographyProps> = ({ variant }) => {
  return (
    <div
      style={{
        padding: '0 16px',
        fontSize: '18px',
        fontFamily: 'Roboto',
      }}
    >
      <section>
        <ul>
          <li style={{ padding: '4px' }}>
            <Text>Variants are compatible with all typography components</Text>
          </li>
          <li style={{ padding: '4px' }}>
            <Text>
              You can try out different typography variants by selecting one
              from controls panel
            </Text>
          </li>
        </ul>
      </section>

      <div style={{ padding: '32px', margin: '0 auto' }}>
        <Text variant={variant as ParagraphsVariants | HeadlineVariants}>
          Variant {variant}
        </Text>
      </div>
    </div>
  )
}
