import { useAppSelector } from "../hooks/useRootState"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { toggleTheme } from "../features/themeSlice"
import Sun from "../icons/Sun"
import Moon from "../icons/Moon"

const ThemeToggle = () => {
  const theme = useAppSelector((state) => state.theme.theme)
  const dispatch = useAppDispatch()

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon /> : <Sun />}
    </button>
  )
}

export default ThemeToggle