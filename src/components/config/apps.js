import WelcomeApp from '../apps/WelcomeApp';
import ClockApp from '../apps/ClockApp';
import NotepadApp from '../apps/NotepadApp';
import WeatherApp from '../apps/WeatherApp';
import SettingsApp from '../apps/SettingsApp';
import MediaPlayerApp from '../apps/MediaPlayerApp';
import FileExplorerApp from '../apps/FileExplorerApp';
import GamesApp from '../apps/GameApp';
import BrowserApp from '../apps/BrowserApp';

import { WelcomeIcon, GlobeIcon, ClockIcon, NotepadIcon, WeatherIcon, SettingsIcon, FileExplorerIcon, MediaPlayerIcon, GamesIcon } from '../icons/AeroIcons';

export const APP_REGISTRY = [
  {
    id: 'welcome',
    title: 'Welcome',
    label: 'Welcome',
    icon: <WelcomeIcon size={26} />,
    smallIcon: <WelcomeIcon size={15} />,
    tileBg: 'linear-gradient(135deg, #b3ecff 0%, #00A8E8 50%, #005f99 100%)',
    width: 500,
    height: 380,
    component: WelcomeApp,
  },
  {
    id: 'clock',
    title: 'Clock',
    label: 'Clock',
    icon: <ClockIcon size={26} />,
    smallIcon: <ClockIcon size={15} />,
    tileBg: 'linear-gradient(135deg, #d4ffb3 0%, #7CFC00 50%, #3a8800 100%)',
    width: 280,
    height: 280,
    component: ClockApp,
  },
  {
    id: 'notepad',
    title: 'Notepad',
    label: 'Notepad',
    icon: <NotepadIcon size={26} />,
    smallIcon: <NotepadIcon size={15} />,
    tileBg: 'linear-gradient(135deg, #ffe9b3 0%, #ffb800 50%, #a86a00 100%)',
    width: 420,
    height: 340,
    component: NotepadApp,
  },
  {
    id: 'weather',
    title: 'Weather',
    label: 'Weather',
    icon: <WeatherIcon size={26} />,
    smallIcon: <WeatherIcon size={15} />,
    tileBg: 'linear-gradient(135deg, #d6f0ff 0%, #5bc8f5 50%, #0077b6 100%)',
    width: 320,
    height: 400,
    component: WeatherApp,
  },
  {
    id: 'settings',
    title: 'Settings',
    label: 'Settings',
    icon: <SettingsIcon size={26} />,
    smallIcon: <SettingsIcon size={15} />,
    tileBg: 'linear-gradient(135deg, #e0e0e0 0%, #a6a6a6 50%, #666666 100%)',
    width: 700,
    height: 500,
    component: SettingsApp,
  },
  {
    id: 'explorer',
    title: 'File Explorer',
    label: 'File Explorer',
    icon: <FileExplorerIcon size={26} />,
    smallIcon: <FileExplorerIcon size={15} />,
    tileBg: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
    width: 700,
    height: 500,
    component: FileExplorerApp,
  },
  {
    id: 'media',
    title: 'Media Player',
    label: 'Media Player',
    icon: <MediaPlayerIcon size={26} />,
    smallIcon: <MediaPlayerIcon size={15} />,
    tileBg: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    width: 650,
    height: 450,
    component: MediaPlayerApp,
  },
  {
    id: 'browser',
    title: 'Web Browser',
    label: 'Web Browser',
    icon: <GlobeIcon size={26} />,
    smallIcon: <GlobeIcon size={15} />,
    tileBg: 'linear-gradient(135deg, #e0e0e0 0%, #a6a6a6 100%)',
    width: 800,
    height: 600,
    component: BrowserApp,
  },
  {
    id: 'games',
    title: 'Games',
    label: 'Games',
    icon: <GamesIcon size={26} />,
    smallIcon: <GamesIcon size={15} />,
    tileBg: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
    width: 800,
    height: 500,
    component: GamesApp,
  }
];

export const getAppConfig = (id) => APP_REGISTRY.find(app => app.id === id);