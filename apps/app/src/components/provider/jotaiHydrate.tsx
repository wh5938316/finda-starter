'use client';

import { type WritableAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/react/utils';
import * as React from 'react';

type AnyWritableAtom = WritableAtom<unknown, any[], any>;

type HydrateAtomsProps = {
  hydrates?: (readonly [AnyWritableAtom, unknown])[];
};

export const HydrateAtoms = (props: React.PropsWithChildren<HydrateAtomsProps>) => {
  const { children, hydrates } = props;
  useHydrateAtoms(hydrates ?? []);

  return children;
};
