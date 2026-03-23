'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import PageLayout from '@/components/layout/PageLayout'
import SectionDivider from '@/components/layout/SectionDivider'
import ContactsSection from '@/components/sections/ContactsSection'
import NotFoundRecommendationsSection from '@/components/sections/NotFoundRecommendationsSection'
import InViewClass from '@/components/motion/InViewClass'
import Reveal from '@/components/motion/Reveal'
import type { ProjectCardProps } from '@/components/projects/ProjectCard'
import { client } from '@/sanity/lib/client'
import { homepageQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import {
  mapSanityHomepageToHomepageData,
  mapSanitySiteSettingsToSiteSettingsData,
} from '@/sanity/lib/mappers'

export default function NotFoundPage() {
  const params = useParams<{ locale: string }>()
  const locale = params?.locale === 'en' ? 'en' : 'ru'

  const [homepage, setHomepage] = useState<
    ReturnType<typeof mapSanityHomepageToHomepageData> | null
  >(null)
  const [siteSettings, setSiteSettings] = useState<
    ReturnType<typeof mapSanitySiteSettingsToSiteSettingsData> | null
  >(null)

  useEffect(() => {
    let isMounted = true

    async function loadPageData() {
      try {
        const [homepageDocument, siteSettingsDocument] = await Promise.all([
          client.fetch(homepageQuery),
          client.fetch(siteSettingsQuery),
        ])

        if (!isMounted) {
          return
        }

        setHomepage(
          homepageDocument
            ? mapSanityHomepageToHomepageData(homepageDocument, locale)
            : null
        )

        setSiteSettings(
          siteSettingsDocument
            ? mapSanitySiteSettingsToSiteSettingsData(siteSettingsDocument, locale)
            : null
        )
      } catch {
        if (!isMounted) {
          return
        }

        setHomepage(null)
        setSiteSettings(null)
      }
    }

    loadPageData()

    return () => {
      isMounted = false
    }
  }, [locale])

  const recommendedProjects = useMemo<ProjectCardProps[]>(() => {
    if (
      !homepage?.homepageProjects ||
      !Array.isArray(homepage.homepageProjects)
    ) {
      return []
    }

    return homepage.homepageProjects.slice(0, 2)
  }, [homepage])

  return (
    <div className="site-root">
      <Header />

      <PageLayout>
        <main className="site-main">
          <InViewClass as="section" className="section-frame">
            <div className="section-shell error-404__shell">
              <div className="error-404__content">
                <Reveal variant="title" as="div">
                  <p className="error-404__code text-title-1">404</p>
                </Reveal>

                <div className="error-404__text">
                  <Reveal variant="title" as="div" delay={75}>
                    <h1 className="error-404__title text-large-title text-caps">
                      {siteSettings?.notFound.title ??
                        (locale === 'ru' ? 'СТРАНИЦА НЕ НАЙДЕНА' : 'PAGE NOT FOUND')}
                    </h1>
                  </Reveal>

                  <Reveal variant="body" as="div" delay={150}>
                    <p className="error-404__description text-body">
                      {siteSettings?.notFound.message ??
                        (locale === 'ru'
                          ? 'Похоже, что эта страница не существует или ссылка устарела.'
                          : 'It appears that this page does not exist or the link is outdated.')}
                    </p>
                  </Reveal>
                </div>

                <Reveal variant="body" as="div" delay={225} className="error-404__actions">
                  <Link
                    href={`/${locale}`}
                    className="ui-button ui-button--primary ui-button--m ui-button--default"
                  >
                    {siteSettings?.notFound.buttonLabel ??
                      (locale === 'ru' ? 'Главная' : 'Home')}
                  </Link>
                </Reveal>
              </div>
            </div>
          </InViewClass>

          <SectionDivider />

          {recommendedProjects.length > 0 ? (
            <>
              <NotFoundRecommendationsSection
                locale={locale}
                title={siteSettings?.notFound.projectsTitle}
                projects={recommendedProjects}
              />
              <SectionDivider />
            </>
          ) : null}

          <ContactsSection
            variant="internal"
            title={siteSettings?.contacts?.title ?? ''}
            buttons={siteSettings?.contacts?.buttons ?? []}
          />
        </main>
      </PageLayout>

      <Footer showAside={siteSettings?.footer.showAside ?? false} />
    </div>
  )
}