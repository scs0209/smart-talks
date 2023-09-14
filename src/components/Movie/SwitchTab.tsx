import React, { VFC, useState } from 'react'

interface Props {
  data: [string, string]
  onTabChange: (tab: string) => void
}

const SwitchTab: VFC<Props> = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0)

  const activeTab = (tab: string, index: number) => {
    setSelectedTab(index)
    onTabChange(tab)
  }

  return (
    <div className="relative w-[200px] p-1 min-h-9 bg-gray-200 dark:bg-slate-600 rounded-full">
      <div className="relative flex items-center h-7">
        {data.map((tab, index) => (
          <span
            key={tab}
            className={`flex z-20 items-center justify-center w-24 text-sm cursor-pointer transition-colors duration-300 
                            ${
                              selectedTab === index
                                ? 'text-white'
                                : 'text-black'
                            }`}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span
          className="absolute left-0 w-1/2 transition-all duration-500 ease-in-out rounded-full h-7"
          style={{
            transform: `translateX(${selectedTab * 100}%)`,
            background: 'linear-gradient(to right, blue, purple)',
          }}
        />
      </div>
    </div>
  )
}

export default SwitchTab
