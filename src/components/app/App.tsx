import _ from 'lodash';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import './App.scss';

import { TabWidget } from '../tab-widget/TabWidget';
import { TabWidgetNav } from '../tab-widget/TabWidgetNav';
import { TabWidgetPanel } from '../tab-widget/TabWidgetPanel';
import { TabWidgetNavItem, ITabWidgetNavItem } from '../tab-widget/TabWidgetNavItem';
import { TabWidgetContent } from '../tab-widget/TabWidgetContent';
import { defaultTabContextState, ITabWidgetContextState } from '../tab-widget/TabWidget.context';
import { useQueryString } from '../../services/hooks';
import useAxios from 'axios-hooks';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import cn from 'classnames';

/*var getApiURL = function (section) {
  return `http://content.guardianapis.com/${section}?api-key=test`;
};

var loadGuardianArticlesBySection = function (section) {
  return fetch(getApiURL(section))
    .then(response => response.json())
    .then(content => content.response.results);
};*/


const THE_GUARDIAN_TABS_LIST = [
  { id: 'uk-news', label: 'UK News', section: 'uk-news' },
  { id: 'travel', label: 'Travel', section: 'travel' },
  { id: 'football', label: 'Football', section: 'football' },
]

const App = memo(function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tabList, setTabList] = useState<ITabWidgetNavItem[]>(THE_GUARDIAN_TABS_LIST as ITabWidgetNavItem[]);
  const [listMapData, setListMpaData] = useState({})
  const [locationActiveTab, setLocationActiveTab] = useQueryString('activeTab', undefined);
  const [currentTab, setCurrentTab] = useStateWithCallbackLazy<Partial<ITabWidgetContextState>>({})

  const restoredActiveTab = useMemo(() => {
    const tab = (locationActiveTab || '').replace('tab_', '')
    const restoredMenuItem = tab
      ? _.first(_.filter(tabList, (tL) => tL.id === tab))
      : _.first(tabList)

    return {
      ...defaultTabContextState,
      activeTab: `tab_${_.get(restoredMenuItem, 'id')}`,
      section: _.get(restoredMenuItem, 'section')
    }
  }, [locationActiveTab, tabList])

  const [{ data, loading, error }, fetchData ] = useAxios(
    `http://content.guardianapis.com/${restoredActiveTab.section}?api-key=test`,
    { manual: true }
  )

  useEffect(() => {
    const section = restoredActiveTab.section
    data && setListMpaData((prev) => {
      return { ...prev, [`${section}`]: _.get(data, 'response.results', [])}
    })
  }, [data, restoredActiveTab.section])

  useEffect(() => {
    if (restoredActiveTab.activeTab !== currentTab?.activeTab) {
      setCurrentTab(restoredActiveTab, () => fetchData())
    }
  }, [currentTab?.activeTab, fetchData, restoredActiveTab, setCurrentTab])


  const handleTabChange = useCallback((state: ITabWidgetContextState) => {
    setLocationActiveTab(state.activeTab)
  }, [setLocationActiveTab])

  return (
    <div className="App">
      <main>
        <section className="App-content">
          <section>
            <TabWidget className="custom-tab-widget"
                       active={restoredActiveTab.activeTab}
                       onTabChange={handleTabChange}
            >
              <TabWidgetNav>
                { _.map(tabList, (item) => <TabWidgetNavItem
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  />
                )}
              </TabWidgetNav>
              <TabWidgetContent>
                { _.map(tabList, (item) => <TabWidgetPanel
                    key={item.id}
                    section={item.id}
                  >
                  { _.isEmpty(_.get(listMapData, `${item.section}`, []))
                    ? <>
                      {/*<span> There are no any news </span>*/}
                    </>
                    : <>
                      <ol className={cn('list-data list-numbered', {
                        'skeleton-loading': loading
                      })}>
                        { loading ? <>
                          <li className="list-item text-hidden">
                            <span> Loading </span>
                          </li>
                        </> : <>
                            { _.map(_.get(listMapData, `${item.section}`), itemData => <li key={itemData.id} className="list-item text-hidden">
                                <a href={itemData.webUrl} title={itemData.webTitle}> { itemData.webTitle } </a>
                              </li>
                            ) }
                        </> }
                      </ol>
                    </>
                  }
                </TabWidgetPanel>) }
              </TabWidgetContent>
            </TabWidget>
          </section>
        </section>
      </main>
    </div>
  );
});

export default App;
