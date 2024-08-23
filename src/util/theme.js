import { extendTheme } from '@chakra-ui/react';
import { inputTheme } from '../components/themeComponents/inputTheme';
import { textareaTheme } from '../components/themeComponents/textareatheme';
import { selectTheme } from '../components/themeComponents/selectTheme';

const theme = extendTheme({
  components: {
    Input: inputTheme,
    Textarea: textareaTheme,
    Select: selectTheme,
  },
});

export default theme;