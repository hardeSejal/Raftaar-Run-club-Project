import { useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function ExchangeToken() {
  useEffect(() => {
    const exchangeToken = async () => {
      const params = new URLSearchParams(window.location.search)
      const code = params.get('code')

      console.log('STRAVA CODE:', code)

      if (!code) {
        console.log('No code found')
        return
      }

      try {
        // STEP 1 — Exchange code for token
        const response = await fetch(
          'https://www.strava.com/oauth/token',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              client_id: import.meta.env.VITE_STRAVA_CLIENT_ID,
              client_secret:
                import.meta.env.VITE_STRAVA_CLIENT_SECRET,
              code,
              grant_type: 'authorization_code',
            }),
          }
        )

        const data = await response.json()

        console.log('STRAVA TOKEN RESPONSE:', data)

        localStorage.setItem(
          'strava_access_token',
          data.access_token
        )

        // STEP 2 — Fetch athlete data
        const athleteResponse = await fetch(
          'https://www.strava.com/api/v3/athlete',
          {
            headers: {
              Authorization: `Bearer ${data.access_token}`,
            },
          }
        )

        const athlete = await athleteResponse.json()

        console.log('ATHLETE:', athlete)

        // STEP 3 — Fetch activities
        const activitiesResponse = await fetch(
          'https://www.strava.com/api/v3/athlete/activities',
          {
            headers: {
              Authorization: `Bearer ${data.access_token}`,
            },
          }
        )

        const activities = await activitiesResponse.json()

        console.log('ACTIVITIES:', activities)

        // STEP 4 — Calculate total distance
        const totalDistance = activities.reduce(
          (
            sum: number,
            activity: { distance: number }
          ) => sum + activity.distance,
          0
        )

        const totalKm = totalDistance / 1000

        console.log('TOTAL KM:', totalKm)

        // STEP 5 — Save to Supabase
        const { error } = await supabase
          .from('leaderboard')
          .upsert([
            {
              id: athlete.id,
              runner:
                athlete.firstname +
                ' ' +
                athlete.lastname,
              distance: totalKm,
            },
          ])

        if (error) {
          console.error('SUPABASE ERROR:', error)
        } else {
          console.log('Leaderboard updated successfully')
        }

        // STEP 6 — Redirect home
        window.location.href = '/'
      } catch (error) {
        console.error('STRAVA ERROR:', error)
      }
    }

    exchangeToken()
  }, [])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      Connecting Strava...
    </div>
  )
}