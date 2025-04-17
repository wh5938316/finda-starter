// src/components/widgets/index.ts
import CheckboxWidget from './CheckboxWidget';
import CheckboxesWidget from './CheckboxesWidget';
import DatePickerWidget from './DatePickerWidget';
import RadioWidget from './RadioWidget';
import SelectWidget from './SelectWidget';
import SwitchWidget from './SwitchWidget';
import TextWidget from './TextWidget';
import TextareaWidget from './TextareaWidget';

const widgets = {
  TextWidget,
  text: TextWidget,
  select: SelectWidget,
  switch: SwitchWidget,
  radio: RadioWidget,
  checkbox: CheckboxWidget,
  checkboxes: CheckboxesWidget,
  textarea: TextareaWidget,
  ['date-picker']: DatePickerWidget,
};

export default widgets;
